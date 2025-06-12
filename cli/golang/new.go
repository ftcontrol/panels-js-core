package main

import (
	"fmt"
	"io/fs"
	"os"
	"path/filepath"
	"strings"
)

func newProjectCommand(params map[string]string) {
	dir, ok := params["dir"]
	if !ok || strings.TrimSpace(dir) == "" {
		dir = prompt("Enter directory name for the new project")
	}

	if exists(dir) {
		fmt.Printf("⚠️  Directory '%s' already exists.\n", dir)

		if strings.ToLower(params["autoremove"]) == "true" {
			if err := os.RemoveAll(dir); err != nil {
				fmt.Printf("❌ Failed to remove directory: %v\n", err)
				return
			}
			fmt.Println("🧹 Directory removed automatically (autoremove=true).")
		} else {
			confirm := prompt("Do you want to delete existing directory contents? (y/N)")
			if strings.ToLower(confirm) == "y" {
				if err := os.RemoveAll(dir); err != nil {
					fmt.Printf("❌ Failed to remove directory: %v\n", err)
					return
				}
				fmt.Println("🧹 Directory cleared.")
			} else {
				fmt.Println("❌ Aborted project creation.")
				return
			}
		}
	}

	if err := os.MkdirAll(dir, 0755); err != nil {
		fmt.Printf("❌ Failed to create directory: %v\n", err)
		return
	}

	err := fs.WalkDir(templateFiles, "template", func(path string, d fs.DirEntry, err error) error {
		if err != nil {
			return err
		}
		relPath, err := filepath.Rel("template", path)
		if err != nil {
			return err
		}
		targetPath := filepath.Join(dir, relPath)
		if d.IsDir() {
			return os.MkdirAll(targetPath, 0755)
		}
		data, err := templateFiles.ReadFile(path)
		if err != nil {
			return err
		}
		if err := os.WriteFile(targetPath, data, 0644); err != nil {
			return err
		}
		fmt.Printf("✅ Wrote %s\n", targetPath)
		return nil
	})

	if err != nil {
		fmt.Printf("❌ Failed to copy template files: %v\n", err)
		return
	}

	isDev := strings.ToLower(params["dev"]) == "true"

	version := "0.6.5"

	data, err := getLatest()
	if err != nil {
		fmt.Printf("❌ Failed to fetch latest version: %v\n", err)
		fmt.Printf("⚠️  Using fallback version: %s\n", version)
	} else {
		version = data.Version
		fmt.Printf("✅ Fetched latest version: %s 🚀\n", version)
	}

	packageName, ok := params["package"]
	pkg := ""
	if isDev {
		packageName = "com.bylazar.mylibrary"
		pkg = packageName
	} else {
		if !ok || strings.TrimSpace(dir) == "" {
			packageName = prompt("Enter package name for the new project, something like `com.bylazar.myplugin`")
		}

		const maxLen = 50
		pkg = strings.TrimSpace(packageName)
		parts := strings.Split(pkg, ".")

		if len(parts) != 3 {
			fmt.Println("Package name must have exactly two dots (like: 'com.example.myplugin')")
			return
		} else if len(pkg) > maxLen {
			fmt.Printf("Package name must be shorter than %d characters\n", maxLen)
			return
		} else if strings.HasPrefix(pkg, "com.bylazar") {
			fmt.Println("Hey! ‘com.bylazar’ is my domain, so please pick a different package prefix.")
			return
		}
	}

	type Replacement struct {
		File        string
		Token       string
		NormalValue string
		DevValue    string
	}

	replacements := []Replacement{
		{
			File:        "/settings.gradle",
			Token:       "<REPLACE>FTCONTROL_LINE1</REPLACE>",
			NormalValue: "",
			DevValue:    "include ':ftcontrol'",
		},
		{
			File:        "/settings.gradle",
			Token:       "<REPLACE>FTCONTROL_LINE2</REPLACE>",
			NormalValue: "",
			DevValue:    "project(':ftcontrol').projectDir = new File('D:/GitHub/ftcontrol/library/lazarkit')",
		},
		{
			File:        "/build.dependencies.gradle",
			Token:       "<REPLACE>FTCONTROL_LINE</REPLACE>",
			NormalValue: fmt.Sprintf(`implementation "com.bylazar:ftcontrol:%s"`, version),
			DevValue:    "implementation project(':ftcontrol')",
		},
		{
			File:        "/Plugin/src/main/java/com/bylazar/mylibrary/MyClass.kt",
			Token:       "<REPLACE>VERSION</REPLACE>",
			NormalValue: pkg,
			DevValue:    pkg,
		},
		{
			File:        "/Plugin/src/main/java/com/bylazar/mylibrary/Something.kt",
			Token:       "<REPLACE>VERSION</REPLACE>",
			NormalValue: pkg,
			DevValue:    pkg,
		},
		{
			File:        "/Plugin/build.gradle",
			Token:       "<REPLACE>VERSION</REPLACE>",
			NormalValue: pkg,
			DevValue:    pkg,
		},
		{
			File:        "/TeamCode/src/main/java/org/firstinspires/ftc/teamcode/configs/Configs.kt",
			Token:       "<REPLACE>VERSION</REPLACE>",
			NormalValue: pkg,
			DevValue:    pkg,
		},
	}

	for _, rep := range replacements {
		fullPath := filepath.Join(dir, rep.File)

		content, err := os.ReadFile(fullPath)
		if err != nil {
			fmt.Printf("failed to read %s: %v", fullPath, err)
			return
		}

		var newValue string
		if isDev {
			newValue = rep.DevValue
		} else {
			newValue = rep.NormalValue
		}

		newContent := strings.ReplaceAll(string(content), rep.Token, newValue)
		err = os.WriteFile(fullPath, []byte(newContent), 0644)
		if err != nil {
			fmt.Printf("failed to write %s: %v", fullPath, err)
			return
		}

		fmt.Printf("✅ Applied replacement in %s\n", fullPath)
	}

	pkgs := strings.Split(pkg, ".")

	oldPath := filepath.Join(dir, "Plugin", "src", "main", "java", "com")
	newPkgPath := filepath.Join(dir, "Plugin", "src", "main", "java", pkgs[0])
	err = os.Rename(oldPath, newPkgPath)
	if err != nil {
		fmt.Printf("Failed to rename folder: %v\n", err)
		return
	}
	oldPath = filepath.Join(dir, "Plugin", "src", "main", "java", pkgs[0], "bylazar")
	newPkgPath = filepath.Join(dir, "Plugin", "src", "main", "java", pkgs[0], pkgs[1])
	err = os.Rename(oldPath, newPkgPath)
	if err != nil {
		fmt.Printf("Failed to rename folder: %v\n", err)
		return
	}
	oldPath = filepath.Join(dir, "Plugin", "src", "main", "java", pkgs[0], pkgs[1], "mylibrary")
	newPkgPath = filepath.Join(dir, "Plugin", "src", "main", "java", pkgs[0], pkgs[1], pkgs[2])
	err = os.Rename(oldPath, newPkgPath)
	if err != nil {
		fmt.Printf("Failed to rename folder: %v\n", err)
		return
	}

	fmt.Printf("Renamed folder to %s\n", newPkgPath)

	installPath := filepath.Join(dir, "Plugin", "src", "main", "web")
	if strings.ToLower(params["autoinstall"]) == "true" {
		installDependencies(installPath)
	} else if strings.ToLower(params["autoinstall"]) != "true" {
		confirm := prompt("Do you want to install dependencies? (y/N)")

		if strings.ToLower(confirm) == "y" {
			installDependencies(installPath)
		}
	}

	fmt.Printf("✅ Project created at '%s'\n", dir)
}

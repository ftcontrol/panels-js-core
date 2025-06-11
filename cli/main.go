package main

import (
	_ "embed"
	"fmt"
	"io/fs"
	"os"
	"path/filepath"
	"strings"
)

func main() {

	var command = "help"
	var args = make([]string, 0)

	if len(os.Args) < 2 {
		fmt.Println("❌ No command provided. Usage: cli <command> arg1=value ...")
	} else {
		command = os.Args[1]
		args = os.Args[2:]
	}

	params := parseArgs(args)

	switch command {
	case "help":
		fmt.Println("helping you")
	case "latest":
		version := "0.6.5"

		data, err := getLatest()
		if err != nil {
			fmt.Printf("❌ Failed to fetch latest version: %v\n", err)
			fmt.Printf("⚠️ Fallback FTControl version: %s\n", version)
		} else {
			version = data.Version
			fmt.Printf("✅ Latest FTControl version: %s 🚀\n", version)
		}
	case "new":
		if !hasBun() {
			return
		}
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

		type Replacement struct {
			File        string
			Token       string
			NormalValue string
			DevValue    string
		}

		replacements := []Replacement{
			{
				File:        "/settings.gradle",
				Token:       "{FTCONTROL_LINE1}",
				NormalValue: "",
				DevValue:    "include ':ftcontrol'",
			},
			{
				File:        "/settings.gradle",
				Token:       "{FTCONTROL_LINE2}",
				NormalValue: "",
				DevValue:    "project(':ftcontrol').projectDir = new File('D:/GitHub/ftcontrol/library/lazarkit')",
			},
			{
				File:        "/build.dependencies.gradle",
				Token:       "{FTCONTROL_LINE}",
				NormalValue: fmt.Sprintf(`implementation "com.bylazar:ftcontrol:%s"`, version),
				DevValue:    "implementation project(':ftcontrol')",
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
	default:
		fmt.Printf("❌ Unknown command: %s\n", command)
	}

}

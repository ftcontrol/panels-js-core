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

		srcDir := filepath.Join(dir, "src")

		for _, dir := range []string{
			filepath.Join(srcDir, "pages"),
			filepath.Join(srcDir, "widgets"),
		} {
			if err := os.MkdirAll(dir, 0755); err != nil {
				fmt.Printf("❌ Failed to create directory %s: %v\n", dir, err)
				return
			}
		}

		pkgPath := filepath.Join(dir, "package.json")
		if err := os.WriteFile(pkgPath, packageJSON, 0644); err != nil {
			fmt.Printf("❌ Failed to write package.json: %v\n", err)
			return
		}
		fmt.Printf("✅ Wrote package.json to %s\n", pkgPath)

		pkgPath = filepath.Join(dir, "tsconfig.json")
		if err := os.WriteFile(pkgPath, tsConfig, 0644); err != nil {
			fmt.Printf("❌ Failed to write tsconfig.json: %v\n", err)
			return
		}
		fmt.Printf("✅ Wrote package.json to %s\n", pkgPath)

		err := fs.WalkDir(srcFiles, ".", func(path string, d fs.DirEntry, err error) error {
			if err != nil {
				return err
			}
			if d.IsDir() {
				return nil
			}
			data, err := srcFiles.ReadFile(path)
			if err != nil {
				return err
			}
			relPath, err := filepath.Rel("example/src", path)
			if err != nil {
				return err
			}
			targetPath := filepath.Join(srcDir, relPath)
			if err := os.MkdirAll(filepath.Dir(targetPath), 0755); err != nil {
				return err
			}
			if err := os.WriteFile(targetPath, data, 0644); err != nil {
				return err
			}
			fmt.Printf("✅ Wrote %s\n", targetPath)
			return nil
		})
		if err != nil {
			fmt.Printf("❌ Failed to extract src files: %v\n", err)
			return
		}

		if strings.ToLower(params["autoinstall"]) == "true" {
			installDependencies(dir)
		} else if strings.ToLower(params["autoinstall"]) != "true" {
			confirm := prompt("Do you want to install dependencies? (y/N)")

			if strings.ToLower(confirm) == "y" {
				installDependencies(dir)
			}
		}

		fmt.Printf("✅ Project created at '%s'\n", dir)
	default:
		fmt.Printf("❌ Unknown command: %s\n", command)
	}

}

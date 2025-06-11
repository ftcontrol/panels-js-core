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

package main

import (
	"fmt"
	"io/fs"
	"os"
	"path/filepath"
	"strings"

	"github.com/google/uuid"
)

func buildProjectCommand(params map[string]string) {
	isDev := strings.ToLower(params["dev"]) == "true"

	dir, ok := params["dir"]
	if isDev {
		dir = "D:\\GitHub\\ftcontrol-plugins\\cli\\app\\Plugin\\src\\main\\web"

	} else {
		if !ok || strings.TrimSpace(dir) == "" {
			dir = prompt("Enter directory of project web app location (where you see package.json)")
		}
	}

	installDependencies(dir)

	standaloneDir := filepath.Join(dir, "src", "_standalone")
	err := os.RemoveAll(standaloneDir)
	if err != nil {
		fmt.Printf("Failed to clear _standalone directory: %v\n", err)
		return
	}
	err = os.MkdirAll(standaloneDir, 0755)
	if err != nil {
		fmt.Printf("Failed to create _standalone directory: %v\n", err)
		return
	}

	widgetsDir := filepath.Join(dir, "src", "widgets")
	fmt.Printf("Listing all .svelte files in %s:\n", widgetsDir)

	err = filepath.WalkDir(widgetsDir, func(path string, d fs.DirEntry, err error) error {
		if err != nil {
			return err
		}

		if !d.IsDir() && strings.HasSuffix(d.Name(), ".svelte") {
			fmt.Println(path)

			uuidFolder := filepath.Join(standaloneDir, uuid.New().String())
			err := os.MkdirAll(uuidFolder, 0755)
			if err != nil {
				return fmt.Errorf("failed to create uuid folder: %w", err)
			}
			svelteContent, err := os.ReadFile(path)
			if err != nil {
				return fmt.Errorf("failed to read svelte file: %w", err)
			}
			indexSveltePath := filepath.Join(uuidFolder, "index.svelte")
			err = os.WriteFile(indexSveltePath, svelteContent, 0644)
			if err != nil {
				return fmt.Errorf("failed to write index.svelte: %w", err)
			}

			componentName := strings.TrimSuffix(d.Name(), ".svelte")
			embedTsContent := fmt.Sprintf(`
				import { embedMultiple } from 'svelte-standalone'
				import %s from './index.svelte'
				embedMultiple(%s, '%s')
			`, componentName, componentName, strings.ToLower(componentName))

			embedTsPath := filepath.Join(uuidFolder, "embed.ts")
			err = os.WriteFile(embedTsPath, []byte(embedTsContent), 0644)
			if err != nil {
				return fmt.Errorf("failed to write embed.ts: %w", err)
			}
		}

		return nil
	})

	if err != nil {
		fmt.Printf("Error walking through widgets directory: %v\n", err)
	}

	bunExecute(dir, "standalone", "build", "--all")

	fmt.Printf("✅ Project build at '%s'\n", dir)
}

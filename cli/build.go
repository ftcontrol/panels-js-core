package main

import (
	"fmt"
	"os"
	"path/filepath"
	"strings"
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

	srcDist := filepath.Join(dir, "dist")
	destAssets := filepath.Join(dir, "..", "assets", "web2")

	err := os.RemoveAll(destAssets)
	if err != nil {
		fmt.Printf("Failed to clear assets web2 directory: %v\n", err)
		return
	}
	err = os.MkdirAll(destAssets, 0755)
	if err != nil {
		fmt.Printf("Failed to recreate assets web2 directory: %v\n", err)
		return
	}

	err = os.RemoveAll(filepath.Join(srcDist))
	if err != nil {
		fmt.Printf("Failed to clear assets web2 directory: %v\n", err)
		return
	}

	buildApp(dir)

	err = copyDir(srcDist, destAssets)
	if err != nil {
		fmt.Printf("Failed to copy built files: %v\n", err)
		return
	}

	fmt.Printf("✅ Project build at '%s'\n", dir)
}

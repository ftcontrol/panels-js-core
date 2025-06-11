package main

import (
	_ "embed"
	"fmt"
	"io/fs"
	"os"
	"path/filepath"
)

func main() {
	const appDir = "app"
	srcDir := filepath.Join(appDir, "src")

	if !hasBun() {
		return
	}

	for _, dir := range []string{
		filepath.Join(srcDir, "pages"),
		filepath.Join(srcDir, "widgets"),
	} {
		if err := os.MkdirAll(dir, 0755); err != nil {
			fmt.Printf("❌ Failed to create directory %s: %v\n", dir, err)
			return
		}
	}

	pkgPath := filepath.Join(appDir, "package.json")
	if err := os.WriteFile(pkgPath, packageJSON, 0644); err != nil {
		fmt.Printf("❌ Failed to write package.json: %v\n", err)
		return
	}
	fmt.Printf("✅ Wrote package.json to %s\n", pkgPath)

	pkgPath = filepath.Join(appDir, "tsconfig.json")
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

	installDependencies(appDir)
}

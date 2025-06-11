package main

import (
	"embed"
	_ "embed"
	"fmt"
	"io/fs"
	"os"
	"os/exec"
	"path/filepath"
)

//go:embed package.json
var packageJSON []byte

//go:embed src/pages/* src/widgets/*
var srcFiles embed.FS

func main() {
	const appDir = "app"
	srcDir := filepath.Join(appDir, "src")

	if _, err := exec.LookPath("bun"); err != nil {
		fmt.Println("❌ 'bun' is not installed.")
		fmt.Println("👉 You can install it following this guide:")
		fmt.Println("   https://bun.sh/docs/installation")
		return
	}
	fmt.Println("✅ 'bun' is installed.")

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
		relPath, err := filepath.Rel("src", path)
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

	cmd := exec.Command("bun", "install")
	cmd.Dir = appDir
	cmd.Stdout = os.Stdout
	cmd.Stderr = os.Stderr
	fmt.Println("Running `bun install` ...")
	if err := cmd.Run(); err != nil {
		fmt.Printf("❌ bun install failed: %v\n", err)
		return
	}

	fmt.Println("✅ bun install completed successfully.")
}

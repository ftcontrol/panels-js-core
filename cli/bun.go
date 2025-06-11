package main

import (
	"fmt"
	"os"
	"os/exec"
)

func hasBun() bool {
	if _, err := exec.LookPath("bun"); err != nil {
		fmt.Println("❌ 'bun' is not installed.")
		fmt.Println("👉 You can install it following this guide:")
		fmt.Println("   https://bun.sh/docs/installation")
		return false
	}
	fmt.Println("✅ 'bun' is installed.")
	return true
}

func installDependencies(appDir string) {
	fmt.Println("📦 Running `bun install` in", appDir)
	if _, err := os.Stat(appDir); os.IsNotExist(err) {
		fmt.Printf("❌ Directory does not exist: %s\n", appDir)
		return
	}

	cmd := exec.Command("bun", "install")
	cmd.Dir = appDir
	cmd.Stdout = os.Stdout
	cmd.Stderr = os.Stderr

	if err := cmd.Run(); err != nil {
		fmt.Printf("❌ bun install failed: %v\n", err)
		return
	}

	fmt.Println("✅ Dependencies installed successfully.")
}

func bunExecute(appDir string, customParams ...string) {
	fmt.Printf("📦 Running `bunx %v` in %s\n", customParams, appDir)
	if _, err := os.Stat(appDir); os.IsNotExist(err) {
		fmt.Printf("❌ Directory does not exist: %s\n", appDir)
		return
	}

	cmd := exec.Command("bunx", customParams...)
	cmd.Dir = appDir
	cmd.Stdout = os.Stdout
	cmd.Stderr = os.Stderr

	if err := cmd.Run(); err != nil {
		fmt.Printf("❌ bunx command failed: %v\n", err)
		return
	}

	fmt.Println("✅ bunx command ran successfully.")
}

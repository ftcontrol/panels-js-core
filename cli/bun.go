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

package main

import (
	"bufio"
	"fmt"
	"os"
	"path/filepath"
	"strings"
)

func exists(path string) bool {
	_, err := os.Stat(path)
	return err == nil
}

func parseArgs(args []string) map[string]string {
	params := make(map[string]string)
	for _, arg := range args {
		parts := strings.SplitN(arg, "=", 2)
		if len(parts) == 2 {
			key := strings.TrimSpace(parts[0])
			value := strings.TrimSpace(parts[1])
			params[key] = value
		}
	}
	return params
}

func prompt(message string) string {
	fmt.Print(message + ": ")
	reader := bufio.NewReader(os.Stdin)
	text, _ := reader.ReadString('\n')
	return strings.TrimSpace(text)
}

func copyDir(src string, dest string) error {
	return filepath.Walk(src, func(path string, info os.FileInfo, err error) error {
		if err != nil {
			return err
		}
		relPath, err := filepath.Rel(src, path)
		if err != nil {
			return err
		}
		destPath := filepath.Join(dest, relPath)

		if info.IsDir() {
			return os.MkdirAll(destPath, info.Mode())
		} else {
			data, err := os.ReadFile(path)
			if err != nil {
				return err
			}
			return os.WriteFile(destPath, data, info.Mode())
		}
	})
}

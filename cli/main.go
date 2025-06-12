package main

import (
	_ "embed"
	"fmt"
	"os"
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
		newProjectCommand(params)
	default:
		fmt.Printf("❌ Unknown command: %s\n", command)
	}

}

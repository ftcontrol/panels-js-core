package main

import "embed"

//go:embed template/**
var templateFiles embed.FS

package main

import "embed"

//go:embed example/**
var exampleFiles embed.FS

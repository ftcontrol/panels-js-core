package main

import "embed"

//go:embed example/package.json
var packageJSON []byte

//go:embed example/tsconfig.json
var tsConfig []byte

//go:embed example/src/pages/* example/src/widgets/*
var srcFiles embed.FS

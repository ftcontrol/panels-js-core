package main

import (
	"encoding/json"
	"errors"
	"io"
	"net/http"
)

type MavenVersion struct {
	IsSnapshot bool   `json:"isSnapshot"`
	Version    string `json:"version"`
}

func getLatest() (*MavenVersion, error) {
	url := "https://mymaven.bylazar.com/api/maven/latest/version/releases/com/bylazar/ftcontrol"

	resp, err := http.Get(url)
	if err != nil {
		return nil, err
	}
	defer resp.Body.Close()

	if resp.StatusCode != http.StatusOK {
		return nil, errors.New("failed to fetch")
	}

	body, err := io.ReadAll(resp.Body)
	if err != nil {
		return nil, err
	}

	var data MavenVersion
	if err := json.Unmarshal(body, &data); err != nil {
		return nil, err
	}

	return &data, nil
}

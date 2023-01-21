package config

import (
	"os"
	"log"

	"github.com/joho/godotenv"
)

func SetEnv() {
	env := os.Getenv("NABELOG_ENV")
	if "" == env {
		env = "development"
	}

	err := godotenv.Load(".env." + env)
  if err != nil {
    log.Fatal("Error loading .env." + env + " file")
  }
}
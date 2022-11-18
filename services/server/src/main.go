package main

import (
	"log"
	"os"

	"github.com/gin-gonic/gin"
	// "github.com/jinzhu/gorm"
)

func main() {
	// db := sqlConnect()
	// defer db.Close()

	router := gin.Default()
	router.LoadHTMLGlob("templates/*.html")

	router.GET("/", func(context *gin.Context) {
		context.HTML(200, "index.html", gin.H{})
	})

	database := os.Getenv("MYSQL_DATABASE")

	router.GET("/hello", func(context *gin.Context) {
		context.JSON(200, gin.H{
			"message": "Hello World!",
			"database": database,
		})
	})
	log.Fatal(router.Run())
}

// func sqlConnect() (database *gorm.DB) {
// 	os.Getenv("MYSQL_DATABASE")
// 	os.Getenv("MYSQL_USER")
// 	os.Getenv("MYSQL_PASSWORD")


// }
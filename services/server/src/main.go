package main

import (
	"log"

	"github.com/gin-gonic/gin"
	"database/sql"
	"fmt"
	"os"
	"time"
	"nabelog/article"
	
	_ "github.com/go-sql-driver/mysql"
)

func open(path string, count uint) *sql.DB {
	db, err := sql.Open("mysql", path)
	if err != nil {
		log.Fatal("open error:", err)
	}

	if err = db.Ping(); err != nil {
		time.Sleep(time.Second * 2)
		count--
		fmt.Printf("retry... count:%v\n", count)
		return open(path, count)
	}

	fmt.Println("db connected!!")
	return db
}

func connectDB() *sql.DB {
	var path string = fmt.Sprintf("%s:%s@tcp(db:3306)/%s?charset=utf8&parseTime=true",
		os.Getenv("MYSQL_USER"), os.Getenv("MYSQL_PASSWORD"),
		os.Getenv("MYSQL_DATABASE"))

	return open(path, 100)
}

func main() {
	db := connectDB()
	defer db.Close()
	article.ReadAll(db)
	// log.Println("start server...")
	// r := gin.Default()
	// r.GET("/hello", func(context *gin.Context) {
	// 	context.JSON(200, gin.H{
	// 		"message": "Hello World!",
	// 	})
	// })
	// log.Fatal(r.Run())
}
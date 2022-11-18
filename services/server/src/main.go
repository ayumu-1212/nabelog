package main

import (
	"log"
	"os"
	"fmt"
	"time"

	_ "github.com/go-sql-driver/mysql"

	"github.com/gin-gonic/gin"
	"github.com/jinzhu/gorm"
)

type Shop struct {
	gorm.Model
	Name string
	Description string
}

func main() {
	db := sqlConnect()
	db.AutoMigrate(&Shop{})
	defer db.Close()

	router := gin.Default()
	router.LoadHTMLGlob("templates/*.html")

	router.GET("/", func(context *gin.Context) {
		context.HTML(200, "index.html", gin.H{})
	})

	router.GET("/hello", func(context *gin.Context) {
		context.JSON(200, gin.H{
			"message": "Hello World!",
		})
	})

	router.GET("/shops", func(context *gin.Context) {
		db := sqlConnect()
		var shops []Shop
		db.Order("created_at asc").Find(&shops)
		defer db.Close()
		context.JSON(200, gin.H{
			"message": "get shops",
			"shops": shops,
		})
	})

  router.POST("/shops/new", func(ctx *gin.Context) {
    db := sqlConnect()
		fmt.Println(ctx)
    name := ctx.PostForm("name")
    description := ctx.PostForm("description")
    fmt.Println("create user " + name + " with description " + description)
    db.Create(&Shop{Name: name, Description: description})
    defer db.Close()

    ctx.Redirect(302, "/")
  })

  // router.POST("/delete/:id", func(ctx *gin.Context) {
  //   db := sqlConnect()
  //   n := ctx.Param("id")
  //   id, err := strconv.Atoi(n)
  //   if err != nil {
  //     panic("id is not a number")
  //   }
  //   var user User
  //   db.First(&user, id)
  //   db.Delete(&user)
  //   defer db.Close()

  //   ctx.Redirect(302, "/")
  // })
	log.Fatal(router.Run())
}

func sqlConnect() (database *gorm.DB) {
	DBMS := "mysql"
	DBNAME := os.Getenv("MYSQL_DATABASE")
	USER := os.Getenv("MYSQL_USER")
	PASS := os.Getenv("MYSQL_PASSWORD")
	PROTOCOL := "tcp(db:3306)"

	CONNECT := USER + ":" + PASS + "@" + PROTOCOL + "/" + DBNAME + "?charset=utf8&parseTime=true&loc=Asia%2FTokyo"

	fmt.Println(CONNECT)

	count := 0
	db, err := gorm.Open(DBMS, CONNECT)
	if err != nil {
		for {
			if err == nil {
				fmt.Println("")
				break
			}
			fmt.Print(".")
			time.Sleep(time.Second)
			count++
			if count > 180 {
				fmt.Println("")
				fmt.Println("DB接続失敗")
				panic(err)
			}
			db, err = gorm.Open(DBMS, CONNECT)
		}
	}
	fmt.Println("DB接続成功")

	return db
}
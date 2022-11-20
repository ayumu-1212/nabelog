package main

import (
	"log"
	"os"
	"fmt"
	"strconv"
	"time"

	_ "github.com/go-sql-driver/mysql"

	"github.com/gin-gonic/gin"
	"github.com/jinzhu/gorm"
	"github.com/gin-contrib/cors"
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

  // ここからCorsの設定
  router.Use(cors.New(cors.Config{
    // アクセスを許可したいアクセス元
    AllowOrigins: []string{
			"http://localhost:3000",
			// "https://127.0.0.1:3000",
    },
    // アクセスを許可したいHTTPメソッド(以下の例だとPUTやDELETEはアクセスできません)
    AllowMethods: []string{
			"POST",
			"GET",
			"DELETE",
			"PATCH",
			"OPTIONS",
    },
    // 許可したいHTTPリクエストヘッダ
    AllowHeaders: []string{
			"Access-Control-Allow-Credentials",
			"Access-Control-Allow-Headers",
			"Content-Type",
			"Content-Length",
			"Accept-Encoding",
			"Authorization",
    },
    // cookieなどの情報を必要とするかどうか
    AllowCredentials: true,
    // preflightリクエストの結果をキャッシュする時間
    MaxAge: 24 * time.Hour,
  }))

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
		clientIP := context.ClientIP()
		fmt.Println(clientIP)
		var shops []Shop
		db.Order("created_at asc").Find(&shops)
		defer db.Close()
		context.JSON(200, gin.H{
			"message": "get shops",
			"shops": shops,
		})
	})

	router.GET("/shops/:id", func(context *gin.Context) {
		db := sqlConnect()
		n := context.Param("id")
		id, err := strconv.Atoi(n)
		if err != nil {
			panic("id is not a number")
		}
		var shop Shop
		db.First(&shop, id)
		defer db.Close()
		context.JSON(200, gin.H{
			"message": "get shop",
			"shop": shop,
		})
	})

	router.PATCH("/shops/:id", func(context *gin.Context) {
		db := sqlConnect()
		n := context.Param("id")
		id, err := strconv.Atoi(n)
		if err != nil {
			panic("id is not a number")
		}
		var shop Shop
		db.First(&shop, id)

    name := context.PostForm("name")
    description := context.PostForm("description")
		shop.Name = name
		shop.Description = description
		db.Save(&shop)

		defer db.Close()
		context.JSON(200, gin.H{
			"message": "get shop",
			"shop": shop,
		})
	})


  router.DELETE("/shops/:id", func(context *gin.Context) {
		fmt.Println("kokoha?")
		db := sqlConnect()
		n := context.Param("id")
		id, err := strconv.Atoi(n)
		if err != nil {
			panic("id is not a number")
		}
		var shop Shop
		db.First(&shop, id)
    db.Delete(&shop)
    defer db.Close()

    context.Redirect(302, "/")
  })

  router.POST("/shops/new", func(context *gin.Context) {
    db := sqlConnect()
		fmt.Println(context)
    name := context.PostForm("name")
    description := context.PostForm("description")
    fmt.Println("create user " + name + " with description " + description)
    db.Create(&Shop{Name: name, Description: description})
    defer db.Close()

    context.Redirect(302, "/")
  })

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
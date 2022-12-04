package main

import (
	"log"
	"os"
	"fmt"
	"strconv"
	"time"

	"nabelog.location/model"

	_ "github.com/go-sql-driver/mysql"

	"github.com/gin-gonic/gin"
	"github.com/jinzhu/gorm"
	"github.com/gin-contrib/cors"
)

func main() {
	db := sqlConnect()
	db.AutoMigrate(&model.Shop{}, &model.Influencer{})
	defer db.Close()

	router := gin.Default()
	router.LoadHTMLGlob("templates/*.html")

  router.Use(cors.New(cors.Config{
    AllowOrigins: []string{
			"http://localhost:3000",
			// "https://127.0.0.1:3000",
    },
    AllowMethods: []string{
			"POST",
			"GET",
			"DELETE",
			"PATCH",
			"OPTIONS",
    },
    AllowHeaders: []string{
			"Access-Control-Allow-Credentials",
			"Access-Control-Allow-Headers",
			"Content-Type",
			"Content-Length",
			"Accept-Encoding",
			"Authorization",
    },
    AllowCredentials: true,
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
		var shops []model.Shop
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
		var shop model.Shop
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
		var shop model.Shop
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
		db := sqlConnect()
		n := context.Param("id")
		id, err := strconv.Atoi(n)
		if err != nil {
			panic("id is not a number")
		}
		var shop model.Shop
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
    fmt.Println("create shop " + name + " with description " + description)
    db.Create(&model.Shop{Name: name, Description: description})
    defer db.Close()

    context.Redirect(302, "/")
  })

	router.GET("/influencers", func(context *gin.Context) {
		db := sqlConnect()
		var influencers []model.Influencer
		db.Order("created_at asc").Find(&influencers)
		defer db.Close()
		context.JSON(200, gin.H{
			"message": "get influencers",
			"influencers": influencers,
		})
	})

	router.GET("/influencers/:id", func(context *gin.Context) {
		db := sqlConnect()
		n := context.Param("id")
		id, err := strconv.Atoi(n)
		if err != nil {
			panic("id is not a number")
		}
		var influencer model.Influencer
		db.First(&influencer, id)
		defer db.Close()
		context.JSON(200, gin.H{
			"message": "get influencer",
			"influencer": influencer,
		})
	})

	router.PATCH("/influencers/:id", func(context *gin.Context) {
		db := sqlConnect()
		n := context.Param("id")
		id, err := strconv.Atoi(n)
		if err != nil {
			panic("id is not a number")
		}
		var influencer model.Influencer
		db.First(&influencer, id)

    name := context.PostForm("name")
    description := context.PostForm("description")
    instagramLink := context.PostForm("instagramLink")
    twitterLink := context.PostForm("twitterLink")
    youtubeLink := context.PostForm("youtubeLink")
    tiktokLink := context.PostForm("tiktokLink")
    webLink := context.PostForm("webLink")

		influencer.Name = name
		influencer.Description = description
		influencer.InstagramLink = instagramLink
		influencer.TwitterLink = twitterLink
		influencer.YoutubeLink = youtubeLink
		influencer.TiktokLink = tiktokLink
		influencer.WebLink = webLink
		db.Save(&influencer)

		defer db.Close()
		context.JSON(200, gin.H{
			"message": "get influencer",
			"influencer": influencer,
		})
	})

  router.DELETE("/influencers/:id", func(context *gin.Context) {
		db := sqlConnect()
		n := context.Param("id")
		id, err := strconv.Atoi(n)
		if err != nil {
			panic("id is not a number")
		}
		var influencer model.Influencer
		db.First(&influencer, id)
    db.Delete(&influencer)
    defer db.Close()

    context.Redirect(302, "/")
  })

  router.POST("/influencers/new", func(context *gin.Context) {
    db := sqlConnect()
    name := context.PostForm("name")
    description := context.PostForm("description")
    instagramLink := context.PostForm("instagramLink")
    twitterLink := context.PostForm("twitterLink")
    youtubeLink := context.PostForm("youtubeLink")
    tiktokLink := context.PostForm("tiktokLink")
    webLink := context.PostForm("webLink")
    fmt.Println("create influencer " + name + " with description " + description)
    db.Create(&model.Influencer{
			Name: name, 
			Description: description, 
			InstagramLink: instagramLink, 
			TwitterLink: twitterLink, 
			YoutubeLink: youtubeLink, 
			TiktokLink: tiktokLink, 
			WebLink: webLink,
		})
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
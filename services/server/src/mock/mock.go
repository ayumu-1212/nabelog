package mock

import (
	"log"
	"os"
	"time"

	"nabelog.location/config"
	"nabelog.location/model"

	_ "github.com/go-sql-driver/mysql"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

func mock() {
	config.SetEnv()
	router := gin.Default()
	router.LoadHTMLGlob("templates/*.html")
	router.Use(cors.New(cors.Config{
		AllowOrigins: []string{
			os.Getenv("CLIENT_URL"),
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
		MaxAge:           24 * time.Hour,
	}))

	router.GET("/", func(context *gin.Context) {
		context.HTML(200, "index.html", gin.H{})
	})

	router.GET("/hello", func(context *gin.Context) {
		context.JSON(200, gin.H{
			"message": "Hello World!",
		})
	})

	var shop model.Shop
	shop.ID = 12
	shop.CreatedAt = time.Now()
	shop.UpdatedAt = time.Now()
	shop.DeletedAt = nil
	shop.Name = "what do you mean"
	shop.Description = "yes i so yeah"

	shops := []model.Shop{shop, shop}

	router.GET("/shops", func(context *gin.Context) {
		context.JSON(200, gin.H{
			"message": "get shops",
			"shops":   shops,
		})
	})

	router.POST("/shops", func(context *gin.Context) {
		context.Redirect(302, "/")
	})

	router.GET("/shops/:id", func(context *gin.Context) {
		context.JSON(200, gin.H{
			"message": "get shop",
			"shop":    shop,
		})
	})

	router.PATCH("/shops/:id", func(context *gin.Context) {
		context.JSON(200, gin.H{
			"message": "get shop",
			"shop":    shop,
		})
	})

	router.DELETE("/shops/:id", func(context *gin.Context) {
		context.Redirect(302, "/")
	})

	var influencer model.Influencer
	influencer.ID = 12
	influencer.CreatedAt = time.Now()
	influencer.UpdatedAt = time.Now()
	influencer.DeletedAt = nil
	influencer.Name = "chanabe"
	influencer.Description = "chanabe"
	influencer.InstagramLink = "https://www.instagram.com/ayumu12.12/"
	influencer.TwitterLink = "https://twitter.com/chanabe1212"
	influencer.YoutubeLink = ""
	influencer.TiktokLink = ""
	influencer.WebLink = ""

	influencers := []model.Influencer{influencer, influencer}

	router.GET("/influencers", func(context *gin.Context) {
		context.JSON(200, gin.H{
			"influencers": influencers,
			"message":     "get influencers",
		})
	})

	router.POST("/influencers", func(context *gin.Context) {
		context.Redirect(302, "/")
	})

	router.GET("/influencers/:id", func(context *gin.Context) {
		context.JSON(200, gin.H{
			"influencer": influencer,
			"message":    "get influencer",
		})
	})

	router.PATCH("/influencers/:id", func(context *gin.Context) {
		context.JSON(200, gin.H{
			"influencer": influencer,
			"message":    "get influencer",
		})
	})

	router.DELETE("/influencers/:id", func(context *gin.Context) {
		context.Redirect(302, "/")
	})

	log.Fatal(router.Run())
}

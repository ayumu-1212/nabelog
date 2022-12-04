package model

import "github.com/jinzhu/gorm"

type Influencer struct {
	gorm.Model
	Name string
	Description string
	InstagramLink string
	TwitterLink string
	YoutubeLink string
	TiktokLink string
	WebLink string
}

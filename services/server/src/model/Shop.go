package model

import "github.com/jinzhu/gorm"

type Shop struct {
	gorm.Model
	Name string
	Description string
}
package main

import (
	"github.com/rafaelporto/gin-api-rest/database"
	"github.com/rafaelporto/gin-api-rest/routes"
)


func main() {
    database.ConectaComBancoDeDados()
    routes.HandleRequests()
}


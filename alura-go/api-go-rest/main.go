package main

import (
	"fmt"

	"github.com/rafaelporto/go-rest-api/database"
	"github.com/rafaelporto/go-rest-api/routes"
)

func main() {
	database.ConectarComBancoDeDados()

	fmt.Println("Iniciando o servidor Rest com Go")
	routes.HandleRequest()
}

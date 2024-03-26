package database

import (
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

var (
    DB *gorm.DB
    err error
)

func  ConectarComBancoDeDados()  {
    stringDeConexao := "host=localserver user=postgres password=123456 dbname=gorestapi port=5432 sslmode=disable"

    DB, err = gorm.Open(postgres.Open(stringDeConexao))

    if err != nil {
        panic("Erro ao conectar com banco de dados")
    }
}

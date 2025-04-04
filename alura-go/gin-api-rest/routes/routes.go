package routes

import (
	"github.com/rafaelporto/gin-api-rest/controllers"

	"github.com/gin-gonic/gin"
)

func HandleRequests()  {
    r := gin.Default()
    r.GET("/alunos", controllers.ExibeTodosAlunos)
    r.GET("/:nome", controllers.Saudacao)
    r.POST("/alunos", controllers.CriaNovoAluno)
    r.GET("alunos/:id", controllers.BuscaAlunoPorID)
    r.DELETE("alunos/:id", controllers.DeletaAluno)
    r.PATCH("alunos/:id", controllers.EditaAluno)
    r.GET("alunos/cpf/:cpf", controllers.BuscaAlunoPorCpf)
    r.Run()
}

package controllers

import (
	"encoding/json"
	"fmt"
	"net/http"

	"github.com/gorilla/mux"
	"github.com/rafaelporto/go-rest-api/database"
	"github.com/rafaelporto/go-rest-api/models"
)

func Home(w http.ResponseWriter, r *http.Request) {
	fmt.Fprint(w, "Home Page")
}

func TodasPersonalidades(w http.ResponseWriter, r *http.Request) {
	var p []models.Personalidade
	database.DB.Find(&p)
	json.NewEncoder(w).Encode(p)
}

func RetornaUmaPersonalidade(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	id := vars["id"]
	var personalidade models.Personalidade

	database.DB.First(&personalidade, id)

	if personalidade.Id != 0 {
		json.NewEncoder(w).Encode(personalidade)
		w.WriteHeader(http.StatusOK)

	} else {
		w.WriteHeader(http.StatusNotFound)
	}
}

func CriaUmaNovaPersonalidade(w http.ResponseWriter, r *http.Request) {
	var novaPersonalidade models.Personalidade
	json.NewDecoder(r.Body).Decode(&novaPersonalidade)
	database.DB.Create(&novaPersonalidade)

	json.NewEncoder(w).Encode(novaPersonalidade)
}

func DeletarUmaPersonalidade(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	id := vars["id"]
	var personalidade models.Personalidade

	database.DB.First(&personalidade, id)

	if personalidade.Id != 0 {
		database.DB.Delete(&personalidade)
		w.WriteHeader(http.StatusNoContent)
	} else {
		w.WriteHeader(http.StatusNotFound)
	}
}

func EditaPersonalidade(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	id := vars["id"]
	var personalidade models.Personalidade

	database.DB.First(&personalidade, id)

	if personalidade.Id == 0 {
		w.WriteHeader(http.StatusNotFound)
	} else {
		json.NewDecoder(r.Body).Decode(&personalidade)
		database.DB.Save(&personalidade)
		json.NewEncoder(w).Encode(personalidade)
	}

}

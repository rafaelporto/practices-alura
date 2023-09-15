import { AppBar, Box, Button, Container, Link, Paper, TextField, Toolbar, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import IRestaurante from "../../../interfaces/IRestaurante";
import http from "../../../http";
import { Link as RouterLink } from "react-router-dom";

export default function FormularioRestaurante() {
  const [nome, setNome] = React.useState('');

  const parametros = useParams();

  useEffect(() => {
    if (parametros.id) {
      http.get<IRestaurante>(`restaurantes/${parametros.id}/`)
        .then(resposta => setNome(resposta.data.nome));
    }
    else
      setNome('');
  }, [parametros]);

  const aoSubmeterForm = (evento: React.FormEvent<HTMLFormElement>) => {
    evento.preventDefault();

    if (parametros.id) {
      http.put(`restaurantes/${parametros.id}/`,
        { nome })
        .then(() => {
          alert('Restaurante atualizado com sucesso!');
        })
    }
    else {
      http.post('restaurantes/',
        { nome })
        .then(() => {
          alert('Restaurante cadastrado com sucesso!');
        })
    }
  }

  return (
    <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", flexGrow: 1 }}>
      <Typography component="h1" variant="h6">Formulário de Restaurante</Typography>
      <Box component="form" sx={{ width: "100%" }} onSubmit={aoSubmeterForm}>
        <TextField
          value={nome}
          id="standard-basic"
          label="Nome do Restaurante"
          variant="standard"
          onChange={evento => setNome(evento.target.value)}
          fullWidth
          required />

        <Button sx={{ marginTop: 1 }} variant="outlined" type="submit" fullWidth>Salvar</Button>
      </Box>
    </Box>
  );
}

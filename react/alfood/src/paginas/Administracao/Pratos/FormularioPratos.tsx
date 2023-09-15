import { Box, Button, FormControl, InputLabel, MenuItem, Select, TextField, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import http from "../../../http";
import ITag from "../../../interfaces/ITag";
import IRestaurante from "../../../interfaces/IRestaurante";

export default function FormularioPratos() {
  const [nome, setNome] = useState('');
  const [descricao, setDescricao] = useState('');

  const [tag, setTag] = useState('');
  const [tags, setTags] = useState<ITag[]>([]);

  const [restaurante, setRestaurante] = useState('');
  const [restaurantes, setRestaurantes] = useState<IRestaurante[]>([]);

  const [imagem, setImagem] = useState<File | null>();

  useEffect(() => {
    http.get<{ tags: ITag[] }>('tags/')
      .then(resposta => setTags(resposta.data.tags));

    http.get<IRestaurante[]>('restaurantes/')
      .then(resposta => setRestaurantes(resposta.data));
  }, []);

  const selecionarArquivo = (evento: React.ChangeEvent<HTMLInputElement>) => {
    if (evento.target.files) {
      setImagem(evento.target.files[0]);
    } else {
      setImagem(null);
    }
  }

  const aoSubmeterForm = (evento: React.FormEvent<HTMLFormElement>) => {
    evento.preventDefault();

    const formData = new FormData();

    formData.append('nome', nome);
    formData.append('descricao', descricao);
    formData.append('tag', tag);
    formData.append('restaurante', restaurante);
    
    if (imagem) {
      formData.append('imagem', imagem);
    }

    http.request({
      url: 'pratos/',
      method: 'POST',
      headers: {
        'Content-Type': 'multipart/form-data'
      },
      data: formData
    })
      .then(resposta => {
        setNome('');
        setDescricao('');
        setTag('');
        setRestaurante('');
        alert('Prato cadastrado com sucesso!');
      })
      .catch(erro => console.log(erro));

  }

  return (
    <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", flexGrow: 1 }}>
      <Typography component="h1" variant="h6">Formulário de Pratos</Typography>
      <Box component="form" sx={{ width: "100%" }} onSubmit={aoSubmeterForm}>
        <TextField
          value={nome}
          id="standard-basic"
          label="Nome do Prato"
          variant="standard"
          onChange={evento => setNome(evento.target.value)}
          fullWidth
          required
          margin="dense" />

        <TextField
          value={descricao}
          id="standard-basic"
          label="Descrição do Prato"
          variant="standard"
          onChange={evento => setDescricao(evento.target.value)}
          fullWidth
          required
          margin="dense" />

        <FormControl fullWidth margin="dense">
          <InputLabel id="select-tag">Tag</InputLabel>
          <Select labelId="select-tag" value={tag} onChange={evento => setTag(evento.target.value)}>
            {tags.map(tag => <MenuItem key={tag.id} value={tag.value}>
              {tag.value}
            </MenuItem>)}
          </Select>
        </FormControl>

        <FormControl fullWidth margin="dense">
          <InputLabel id="select-tag">Restaurante</InputLabel>
          <Select labelId="select-tag" value={restaurante} onChange={evento => setRestaurante(evento.target.value)}>
            {restaurantes.map(restaurante => <MenuItem key={restaurante.id} value={restaurante.id}>
              {restaurante.nome}
            </MenuItem>)}
          </Select>
        </FormControl>

        <input type="file" onChange={selecionarArquivo} />

        <Button sx={{ marginTop: 1 }} variant="outlined" type="submit" fullWidth>Salvar</Button>
      </Box>
    </Box>
  );
}

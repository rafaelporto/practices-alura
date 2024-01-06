package br.com.alura.screenmatch.principal;

import br.com.alura.screenmatch.excecao.ErroDeConversaoDeAnoException;
import br.com.alura.screenmatch.modelos.Titulo;
import br.com.alura.screenmatch.modelos.TituloOmdb;
import com.google.gson.FieldNamingPolicy;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.reflect.TypeToken;

import java.io.FileReader;
import java.io.FileWriter;
import java.io.IOException;
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.util.ArrayList;
import java.util.Scanner;

public class PrincipalComBusca {
    public static void main(String[] args) throws IOException, InterruptedException {

        var scanner = new Scanner(System.in);
        var busca = "";
        var titulos = new ArrayList<Titulo>();
        Gson gson = new GsonBuilder()
                .setFieldNamingPolicy(FieldNamingPolicy.UPPER_CAMEL_CASE)
                .setPrettyPrinting()
                .create();

        var leitor = new FileReader("filmes.json");
        titulos = gson.fromJson(leitor,
                new TypeToken<ArrayList<Titulo>>() {}.getType());

        while (!busca.equalsIgnoreCase("sair")) {

            System.out.println("Digite o nome do filme: ");
            busca = scanner.nextLine()
                    .replace(" ", "+");

            if (busca.equalsIgnoreCase("sair")) {
                break;
            }

            var endereco = "https://www.omdbapi.com/?t=" + busca + "&apikey=71e4785e";

            var client = HttpClient.newHttpClient();
            var request = HttpRequest.newBuilder()
                    .uri(URI.create(endereco))
                    .build();

            var response = client.send(request, HttpResponse.BodyHandlers.ofString());

            var json = response.body();
            System.out.println(json);

            var tituloOmdb = gson.fromJson(json, TituloOmdb.class);
            System.out.println(tituloOmdb);
            try {
                var meuTitulo = new Titulo(tituloOmdb);
                System.out.println("Titulo já convertido");
                System.out.println(meuTitulo);

                appendTitulo(meuTitulo, titulos);

            } catch (NumberFormatException e) {
                System.out.println("Aconteceu um erro: ");
                System.out.println(e.getMessage());
            } catch (ErroDeConversaoDeAnoException ex) {
                System.out.println(ex.getMessage());
            }
        }

        var escrita = new FileWriter("filmes.json");
        escrita.write(gson.toJson(titulos));
        escrita.close();

        System.out.println("O programa finalizou corretamente!");
    }

    private static ArrayList<Titulo> appendTitulo(Titulo titulo, ArrayList<Titulo> titulos) {
        boolean deveAdicionar = false;

        if (titulos.isEmpty())
            deveAdicionar = true;

        for (var tituloDaLista : titulos) {
            if (!tituloDaLista.getNome().equals(titulo.getNome())) {
                System.out.println("O titulo não existe na lista");
                deveAdicionar = true;
            }
        }

        if (deveAdicionar)
            titulos.add(titulo);

        return titulos;
    }
}

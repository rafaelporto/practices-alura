package br.com.alura.bytebank;

import com.zaxxer.hikari.HikariConfig;
import com.zaxxer.hikari.HikariDataSource;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

public class ConnectionFactory {
    private static final String connectionString = "jdbc:mysql://localserver:3306/byte_bank?user=root&password=123456";

    public Connection recuperarConexao() {
        try {
            return createDataSource().getConnection();
        } catch (SQLException e) {
        throw new RuntimeException(e);
        }
    }

    private HikariDataSource createDataSource() {
        HikariConfig config = new HikariConfig();
        config.setJdbcUrl(connectionString);
        config.setUsername("root");
        config.setPassword("123456");
        config.setMaximumPoolSize(10);

        return new HikariDataSource(config);
    }
}


const MongoClient = require('mongodb').MongoClient;
require('dotenv').config();

// URL de conexão com o MongoDB
const url = `mongodb://${process.env.MONGODB_USER}:${process.env.MONGODB_PASSWORD}@${process.env.MONGODB_HOST}:${process.env.MONGODB_PORT}`;

// Nome do banco de dados que você deseja usar
const dbName = process.env.MONGODB_DB;

// Cria uma nova instância do MongoClient
const client = new MongoClient(url, { useNewUrlParser: true });

// Conecta ao servidor MongoDB
const connect = async () => {
    try {
        await client.connect();
        console.log('Database connection successfully established.');

        const db = client.db(dbName);
        return db;
    } catch (error) {
        console.error('Error connecting to database:', error);
        throw error;
    }
};

module.exports = connect();

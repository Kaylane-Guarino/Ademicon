  const connection = require('./connection');
  const { v4: uuidv4 } = require('uuid');

  const getAll = async () => {
    const db = await connection;

    const clients = await db.collection('clients').find({}).toArray();

    return clients;
  };

  async function addClient(client) {
    try {
      const db = await connection;
      const userId = uuidv4(); // Gera um UUID único
      client._id = userId; // Atribui o UUID ao campo _id
      const result = await db.collection('clients').insertOne(client);
      return result;
    } catch (error) {
      throw error;
    }
  }

  async function findClientByName(name) {
    try {
      const db = await connection;
      const client = await db.collection('clients').findOne({ name });
      return client;
    } catch (error) {
      throw error;
    }
  }

  async function updateClient(id, updatedData) {
    try {
      const db = await connection;
      const result = await db.collection('clients').updateOne({ _id: id }, { $set: updatedData });
      return result;
    } catch (error) {
      throw error;
    }
  }

  async function findClientById(id) {
    try {
      const db = await connection;
      const client = await db.collection('clients').findOne({ _id: id });
      return client;
    } catch (error) {
      throw error;
    }
  }

  async function deleteClient(id) {
    try {
      const db = await connection;
      const client = await db.collection('clients').deleteOne({ _id: id });
      return client;
    } catch (error) {
      throw error;
    }
  }

  module.exports = {
    getAll,
    addClient,
    findClientByName,
    updateClient,
    findClientById,
    deleteClient
  };

const jwt = require('jsonwebtoken');
const connection = require('./connection');

function generateToken(userId) {
  const secretKey = process.env.JWT_TOKEN_SECRET; // Chave secreta para assinar o token (geralmente obtida de variável de ambiente)
  const token = jwt.sign({ userId }, secretKey, { expiresIn: '24h' }); // Define o ID do usuário no payload do token e define o tempo de expiração
  return token;
}

async function createUser(user) {
  try {
    const db = await connection;
    const result = await db.collection('users').insertOne(user);
    return result;
  } catch (error) {
    throw error;
  }
}

async function findUserByEmail(email) {
  try {
    const db = await connection;
    const user = await db.collection('users').findOne({ email });
    return user;
  } catch (error) {
    throw error;
  }
}

module.exports = {
  generateToken,
  createUser,
  findUserByEmail
};

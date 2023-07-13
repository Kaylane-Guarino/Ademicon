const jwt = require('jsonwebtoken');
// const secretKey = require('../utils/generateSecretKey');

function verifyToken(req, res, next) {
  const token = req.headers.authorization; // Obtém o token do cabeçalho de autorização
  const secretKey = process.env.JWT_TOKEN_SECRET

  if (!token) {
    return res.status(401).json({ message: 'Token de autenticação não fornecido' });
  }

  try {
    const decodedToken = jwt.verify(token, secretKey);
    req.userId = decodedToken.userId; // Armazena o ID do usuário no objeto de requisição para uso posterior
    next();
  } catch (error) {
    console.error('Erro ao verificar token:', error);
    res.status(401).json({ message: 'Token de autenticação inválido' });
  }
}

module.exports = {
  verifyToken
};

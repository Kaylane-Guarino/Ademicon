const bcrypt = require('bcryptjs');
const User = require('../models/userModel');
const { generateToken } = require("../models/userModel");

async function registerUser(req, res) {
  const { name, email, password } = req.body;

  try {
    // Verificar se o usuário já está cadastrado
    const existingUser = await User.findUserByEmail(email);
    if (existingUser) {
      return res.status(400).json({ message: 'Email já está em uso' });
    }

    if (!name) return res.status(400).json({ message: "O nome é obrigatório!" });
    if (!email) return res.status(400).json({ message: "O email é obrigatório!" });
    if (!password) return res.status(400).json({ message: "A senha é obrigatória!" });

    // Criptografar a senha
    const hashedPassword = await bcrypt.hash(password, 10);

    // Criar um novo usuário
    const newUser = {
      name,
      email,
      password: hashedPassword
    };

    await User.createUser(newUser);

    return res.status(201).json({ message: 'Usuário registrado com sucesso' });
  } catch (error) {
    console.error('Erro ao registrar usuário:', error);
    return res.status(500).json({ message: 'Erro ao registrar usuário' });
  }
}

async function loginUser(req, res) {
  const { email, password } = req.body;

  try {
    if (!email) return res.status(400).json({ message: "O email é obrigatório!" });
    if (!password) return res.status(400).json({ message: "A senha é obrigatória!" });

    // Verificar se o usuário existe
    const user = await User.findUserByEmail(email);
    if (!user) {
      return res.status(400).json({ message: 'Credenciais inválidas' });
    }

    // Verificar a senha
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: 'Credenciais inválidas' });
    }

    const token = generateToken(user._id);

    // Login bem-sucedido
    return res.status(200).json({ token: token });
  } catch (error) {
    console.error('Erro ao fazer login:', error);
    return res.status(500).json({ message: 'Erro ao fazer login' });
  }
}

module.exports = {
  registerUser,
  loginUser
};


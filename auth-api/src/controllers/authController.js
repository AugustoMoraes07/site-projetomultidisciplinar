const Joi = require('joi'); // Importando Joi
const User = require('../models/User');
const jwt = require('jsonwebtoken');

// Esquema de validação com Joi
const signUpValidationSchema = Joi.object({
  username: Joi.string().min(3).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});

// Função de Signup
const signUp = async (req, res) => {
  // Validar os dados de entrada
  const { error } = signUpValidationSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  try {
    const { username, email, password } = req.body;

    // Verificar se o usuário já existe
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: 'Usuário já existe' });
    }

    const newUser = new User({ username, email, password });
    await newUser.save();

    res.status(201).json({ message: 'Usuário criado com sucesso' });
  } catch (error) {
    res.status(500).json({ message: 'Erro no servidor' });
  }
};

// Função de Login
const login = async (req, res) => {
  // Validar os dados de entrada
  const loginValidationSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
  });

  const { error } = loginValidationSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Usuário não encontrado' });
    }

    const isMatch = await user.comparePassword(password); // A função comparePassword deve ser implementada no modelo User
    if (!isMatch) {
      return res.status(400).json({ message: 'Senha incorreta' });
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.status(200).json({ message: 'Login bem-sucedido', token });
  } catch (error) {
    res.status(500).json({ message: 'Erro no servidor' });
  }
};

module.exports = { signUp, login };

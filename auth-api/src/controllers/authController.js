const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.registerUser = async (req, res) => {
    const { username, email, password} = req.body;

    try {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({ username, email, password:hashedPassword });
        await newUser.save();

        res.status(201).json({ message: 'Usuário cadastrato com sucesso!'});
    } catch (error) {
        res.status(500).json({message: 'Erro ao cadastrar usuário', error });
    }
};

exports.loginUser = async (req, res) => {
    const {email, password} = req.body;

    try {
        const user = await User.findOne({email });
        if (!user) return res.status(404).json({message: 'Usuário não encontrado' });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res. status(400).json({ message: 'senha incorreta'});

        res.json({ message: 'Login bem-sucedido!', token });
    } catch (error) {
        res.status(500).json({ message: 'Erro no login', error});
    }
};
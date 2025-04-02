const express = require('express');
const { signUp, login } = require('../controllers/authController'); // Usando 'signUp' e 'login'

const router = express.Router();

router.post('/signup', signUp); // Alterado para 'signUp'
router.post('/login', login); // Alterado para 'login'

module.exports = router;

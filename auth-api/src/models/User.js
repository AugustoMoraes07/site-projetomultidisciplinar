const mongoose = require('mongoose');
const bcrypt = require('bcryptjs'); // Importando bcrypt para hash da senha

// Definição do esquema do usuário
const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

// Método para comparar a senha com o hash armazenado no banco
userSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

// Antes de salvar o usuário, fazer o hash da senha
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next(); // Se a senha não foi alterada, não faz nada
  this.password = await bcrypt.hash(this.password, 10); // Hash a senha
  next();
});

const User = mongoose.model('User', userSchema);

module.exports = User;

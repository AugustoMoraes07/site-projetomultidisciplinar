const mongoose = require('mongoose');
const dotenv = require('dotenv');

// Carregar variáveis de ambiente do arquivo .env
dotenv.config();

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("MongoDB conectado com sucesso!");
    } catch (error) {
        console.error("Erro ao conectar ao MongoDB:", error);
        process.exit(1);
    }
};

module.exports = connectDB;

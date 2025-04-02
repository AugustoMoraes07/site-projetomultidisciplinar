const mongoose = require('mongose');
const dotenv = require('dotenv');

dotenv.config = async () => {
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
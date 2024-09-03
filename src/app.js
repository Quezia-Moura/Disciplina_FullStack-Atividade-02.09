require('dotenv').config();
const express = require('express');
const connectDB = require('./config/mongooseConfig');
const sequelize = require('./config/dbConfig');
const authRoutes = require('./routes/authRoutes');
const itemRoutes = require('./routes/itemRoutes');

const app = express();

// Conectar ao MongoDB
connectDB();

// Conectar ao Sequelize
sequelize.authenticate().then(() => console.log('Sequelize conectado...')).catch(err => console.log('Erro: ' + err));

app.use(express.json());
app.use('/api/auth', authRoutes);
app.use('/api/items', itemRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const pollRoutes = require('./routes/pollRoutes');
const app = express();

app.use(cors({
    origin: true, // Accepte toutes les origines
    credentials: true
}));
app.use(express.json());

// Railway fournit la variable MONGO_URI via les variables d'environnement
const mongoUri = process.env.MONGO_URI || process.env.DATABASE_URL || 'mongodb://localhost:27017/sondages';
mongoose.connect(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true });

app.use('/api/polls', pollRoutes);

// Railway utilise la variable PORT automatiquement
const PORT = process.env.PORT || 4000;
app.listen(PORT, '0.0.0.0', () => {
    console.log(`Backend running on port ${PORT}`);
    console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
});


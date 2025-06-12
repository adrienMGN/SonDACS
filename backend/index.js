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

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
app.use('/api/polls', pollRoutes);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Backend running on port ${PORT}`));


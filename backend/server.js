const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const sequelize = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const postRoutes = require('./routes/postRoutes');  // <-- Use plural 'postRoutes' if your file is named postRoutes.js

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/posts', postRoutes);

app.get('/', (req, res) => {
  res.send('Welcome to the Blogging Platform API!');
});

// Connect to DB and sync models
sequelize.authenticate()
  .then(() => {
    console.log('✅ Database connected...');
    return sequelize.sync(); // sync models with DB tables
  })
  .then(() => {
    console.log('✅ Sequelize models synced');
    // Start server
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
    });
  })
  .catch(err => {
    console.error('❌ Error connecting to database:', err);
  });

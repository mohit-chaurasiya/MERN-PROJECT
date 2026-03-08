const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db')

dotenv.config();
const app = express();

connectDB();

app.get('/', (req, res) => {
  res.send('Visitor Pass Management Backend is running');
}); 

const PORT = process.env.PORT ;

app.listen(PORT, () => {
    console.log(`Server is running on port http://localhost:${PORT}`);
});
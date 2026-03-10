const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

const authRoutes = require('./routes/authRoutes');
const adminRoutes = require('./routes/adminRoutes');
const visitorRoutes = require('./routes/visitorRoutes');

dotenv.config();
const app = express();

// database connection
connectDB();

// Middleware
app.use(express.json());

// Routes
app.use('/auth', authRoutes);
app.use('/admin', adminRoutes);

// visitor routes
app.use("/api/visitors",visitorRoutes)



app.get('/', (req, res) => {
  res.send('Visitor Pass Management Backend is running');
}); 

const PORT = process.env.PORT ;

app.listen(PORT, () => {
    console.log(`Server is running on port http://localhost:${PORT}`);
});
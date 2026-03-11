const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

const authRoutes = require('./routes/authRoutes');
const adminRoutes = require('./routes/adminRoutes');
const visitorRoutes = require('./routes/visitorRoutes');
const appointmentRoutes = require('./routes/appointmentRoutes');
const passRoutes = require('./routes/passRoutes');

const checkRoutes = require('./routes/checkRoutes')

dotenv.config();
const app = express();

// database connection
connectDB();

// Middleware
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes);

// visitor routes
app.use("/api/visitors",visitorRoutes)

// Appointment routes
app.use("/api/appointments", appointmentRoutes)

// Pass routes
app.use("/api/passes", passRoutes)

// check log routes
app.use("/api/check", checkRoutes)



app.get('/', (req, res) => {
  res.send('Visitor Pass Management Backend is running');
}); 

const PORT = process.env.PORT ;

app.listen(PORT, () => {
    console.log(`Server is running on port http://localhost:${PORT}`);
});
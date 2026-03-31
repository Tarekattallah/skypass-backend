const express = require('express');
const cors = require('cors');
require('./modules/airports/airport.model');
require('./modules/airplanes/airplane.model');

const authRoutes = require('./modules/auth/auth.routes');
const flightRoutes = require('./modules/flights/flight.routes');
const bookingRoutes = require('./modules/bookings/booking.routes');
const app = express();
app.use(cors());
app.use(express.json());
 
app.get('/', (req, res) => {
    res.json({ message: 'SkyPass API is running!' });
});
app.use('/api/auth', authRoutes);
app.use('/api/flights', flightRoutes);
app.use('/api/bookings', bookingRoutes);
app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    res.status(statusCode).json({
        status: 'error',
        message: err.message || 'Internal Server Error',
    });
});

module.exports = app;
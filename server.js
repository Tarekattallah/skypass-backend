require('dotenv').config();
const mongoose = require('mongoose');
const app = require('./src/app');
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/skypass';

mongoose.connect(MONGO_URI)
    .then(() => {
        console.log('MongoDB Connected');
        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    })
    .catch((err) => {
        console.error('DB Connection Error:', err.message);
        process.exit(1);
    });
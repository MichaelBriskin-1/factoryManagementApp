const mongoose = require('mongoose');
require('dotenv').config();


const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/factoryDB';


const connectDB = () => {
return mongoose
.connect(MONGO_URI)
.then(() => console.log('Connected to MongoDB:', MONGO_URI))
.catch((error) => console.error('Mongo connection error:', error));
};


module.exports = { connectDB };
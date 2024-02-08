require('dotenv').config() 
// Load dotenv for managing environment variables

const express = require('express');
const app = express();
const mongoose = require('mongoose');

mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true }); 
// Connect to MongoDB server

const db = mongoose.connection;

db.on('error', (error) => console.error(error)); 
// Print any connection errors to the console
db.once('open', () => console.log('Connected to database')); 
// Print success message to console if connected to the database successfully

app.use(express.json()); 
// Connect to read requests in JSON format

// Import routes from other files and add them here as middleware
const testRouter = require('./routes/testroutes')
app.use('/testroutes', testRouter)

app.listen(3000, () => console.log('Server is running on port 3000')); 
// Listen for connections on port 3000

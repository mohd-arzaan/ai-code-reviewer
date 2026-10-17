const express = require('express');
const cors = require('cors'); 
const aiRoutes = require('./routes/ai.routes');

const app = express();
app.use(cors({
  origin: "https://ai-code-reviewer-mu-indol.vercel.app"
})); 
app.use(express.json());

// Yahan '/ai' likha hai
app.use('/ai', aiRoutes); 

module.exports = app;
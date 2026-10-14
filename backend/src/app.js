const express = require('express');

const aiRoutes = require('./routes/ai.routes');






const app = express();


app.get('/', (req, res) => {
  res.send('Hello, World!')
});

app.use ('/api', aiRoutes);

module.exports = app;
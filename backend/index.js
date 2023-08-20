import express from 'express';

// ensure env variables are available throughout backend
if (process.env.ENV === 'dev') require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 8000;

app.get("/", (req, res) => {
  res.json("Hello mate!");
});

app.listen(PORT, () => { console.log(`Server is running on Port: ${PORT}`)});
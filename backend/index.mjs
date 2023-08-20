// using ES6 syntax requires extra steps for require() method
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
// ensure env variables are available throughout backend during development
if (process.env.ENV === 'dev') { require('dotenv').config() }
// import express for app backend environment
import express from 'express';
// create app
const app = express();
// define port
const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.json("Hello mate!");
});

app.listen(PORT, () => { console.log(`Server is running on Port: http://localhost:${PORT}`)});
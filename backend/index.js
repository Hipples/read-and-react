import express from 'express';

// ensure env variables are available throughout backend
if (process.env.ENV === 'dev') require('dotenv').config();

const app = express();
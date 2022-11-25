import express from 'express';
import MovieRouter from '../src/routes/movieRouter';
import 'dotenv/config';
import { connectDB } from './config/db';
const app = express();

// Config
connectDB();

// Middleware
app.use(express.json());
app.use('/api/v1/Movie', MovieRouter);

app.listen(3254, () => {
  console.log('Server is running on port 3254');
});
import express from 'express';
import connectDB from './config/db.js';
import dotenv from 'dotenv';
import userRoutes from './routes/userRoutes.js';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 3000;
dotenv.config();
app.use(cors());

app.use(express.json());
app.use('/api', userRoutes);

connectDB();

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
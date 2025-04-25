import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import connectDB from './config/db.js';
import userRoutes from './routes/userRoutes.js';
import fileRoutes from './routes/fileRoutes.js';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Connect to database
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Create uploads directory if it doesn't exist
if (!fs.existsSync('uploads')) {
    fs.mkdirSync('uploads');
}

// Routes
app.use('/api/users', userRoutes);
app.use('/api/files', fileRoutes);

// Serve uploaded files
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

const PORT = process.env.PORT || 5000;
const BACKEND_URL = process.env.BACKEND_URL || 'http://localhost:5000';

app.listen(PORT, () => {
    console.log(`Server is running on ${BACKEND_URL}`);
});

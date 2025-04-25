import express from 'express';
import { protect } from '../middleware/auth.js';
import { upload, uploadFile } from '../controllers/fileController.js';

const router = express.Router();

router.post('/upload', protect, upload.single('file'), uploadFile);

export default router; 
import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configure multer for file upload
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 5 * 1024 * 1024 // 5MB limit
    },
    fileFilter: function (req, file, cb) {
        const filetypes = /csv|excel|xlsx/;
        const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
        const mimetype = filetypes.test(file.mimetype);

        if (extname && mimetype) {
            return cb(null, true);
        } else {
            cb('Error: Only CSV and Excel files are allowed!');
        }
    }
});

// @desc    Upload test data file
// @route   POST /api/files/upload
// @access  Private
const uploadFile = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: 'Please upload a file' });
        }

        res.json({
            message: 'File uploaded successfully',
            filename: req.file.filename,
            cpid: req.user.cpid
        });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export { upload, uploadFile }; 
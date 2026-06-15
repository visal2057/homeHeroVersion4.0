const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const { authenticateToken } = require('../middleware/auth');
const { 
    uploadDocument, 
    updateWorkerDetails, 
    getServiceCategories, 
    getDistricts, 
    getVerificationStatus 
} = require('../controllers/AuthController');

// Ensure upload directory exists
const uploadDir = './uploads';
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, 'doc-' + uniqueSuffix + path.extname(file.originalname));
    }
});

const upload = multer({ 
    storage: storage,
    limits: { fileSize: 5 * 1024 * 1024 }
});

// Routes
router.get('/categories', getServiceCategories);
router.get('/districts', getDistricts);
router.post('/upload-document', authenticateToken, upload.single('document'), uploadDocument);
router.put('/update-details', authenticateToken, updateWorkerDetails);
router.get('/verification-status', authenticateToken, getVerificationStatus);

module.exports = router;
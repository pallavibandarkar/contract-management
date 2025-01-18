const express = require('express');
const aggrement = express.Router();
const Agreement = require("../models/agreement.js");
// const cloudinary = require('cloudinary').v2;
// const multer = require('multer');
// const { cloudinary, storage } = require('../cloudinaryConfig'); 
// const upload = multer({ storage});

aggrement.use(express.json());
aggrement.use(express.urlencoded({ extended: true }));


aggrement.post('/agreements',async (req, res) => {
    try {
        const { title, description, expirationDate} = req.body;
        // const cloudinaryUrl = req.file.path; // Get the Cloudinary URL from the uploaded file

        const agreement = new Agreement({
            title,
            description,
            //terms: cloudinaryUrl,
            status: 'draft',
            expirationDate,
        });

        await agreement.save();
        res.status(201).json(agreement);
    } catch (error) {
        console.error('Error creating agreement:', error);
        res.status(500).json({ error: 'An error occurred while creating the agreement.' });
    }
});

module.exports = aggrement;
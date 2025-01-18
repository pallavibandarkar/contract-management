const express = require('express');
const agreement = express.Router();
const Agreement = require("../models/agreement.js");
// const cloudinary = require('cloudinary').v2;
// const multer = require('multer');
// const { cloudinary, storage } = require('../cloudinaryConfig'); 
// const upload = multer({ storage});

agreement.use(express.json());
agreement.use(express.urlencoded({ extended: true }));


agreement.post('/agreements',async (req, res) => {
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

agreement.put('/agreements/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { title, description, expirationDate, status, markDown } = req.body;

        const existingAgreement = await Agreement.findById(id);
        if (!existingAgreement) {
            return res.status(404).json({ error: 'Agreement not found' });
        }

        const updateData = {
            title: title !== undefined ? title : existingAgreement.title,
            description: description !== undefined ? description : existingAgreement.description,
            expirationDate: expirationDate !== undefined ? expirationDate : existingAgreement.expirationDate,
            status: status !== undefined ? status : existingAgreement.status,
            markDown: markDown !== undefined ? markDown : existingAgreement.markDown,
            updatedAt: Date.now(), 
        };

        const updatedAgreement = await Agreement.findByIdAndUpdate(id, updateData, { new: true });

        if (!updatedAgreement) {
            return res.status(404).json({ error: 'Agreement not found' });
        }

        res.status(200).json(updatedAgreement);
    } catch (error) {
        console.error('Error updating agreement:', error);
        res.status(500).json({ error: 'An error occurred while updating the agreement.' });
    }
});


agreement.delete('/agreements/:id', async (req, res) => {
    try {
        const { id } = req.params; 
        const deletedAgreement = await Agreement.findByIdAndDelete(id);

        if (!deletedAgreement) {
            return res.status(404).json({ error: 'Agreement not found' });
        }

        res.status(200).json({ message: 'Agreement deleted successfully' });
    } catch (error) {
        console.error('Error deleting agreement:', error);
        res.status(500).json({ error: 'An error occurred while deleting the agreement.' });
    }
});

agreement.get("/agreements",async(req,res)=>{
    try{
        const agreements = await Agreement.find();
        if(!agreements){
            res.send({success:"false",msg:"Agreements not found"});
        }
        res.send({success:true,data:agreements})
    }catch(err){
        res.send({success:"false",msg:"Agreements not found",error:err});
    }
})

module.exports = agreement;
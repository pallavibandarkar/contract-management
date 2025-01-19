const Contract = require("../models/agreement.js")

module.exports.getAgreements = async(req,res)=>{
    try{
        const agreements = await Contract.find();
        if(!agreements){
            res.send({success:"false",msg:"Agreements not found"});
        }
        console.log(agreements)
        res.send({success:true,data:agreements})
    }catch(err){
        console.console.log(err);
        res.send({success:"false",msg:"Agreements not found",error:err});
    }
}

module.exports.updateAgreement = async (req, res) => {
    try {
        const { id } = req.params;
        const { expirationDate, status} = req.body;

        const existingAgreement = await Contract.findById(id);
        if (!existingAgreement) {
            return res.status(404).json({ error: 'Agreement not found' });
        }

        const updateData = {
            expirationDate: expirationDate !== undefined ? expirationDate : existingAgreement.expirationDate,
            status: status !== undefined ? status : existingAgreement.status,
            updatedAt: Date.now(), 
        };

        const updatedAgreement = await Contract.findByIdAndUpdate(id, updateData, { new: true });

        if (!updatedAgreement) {
            return res.status(404).json({ error: 'Agreement not found' });
        }
        console.log(updatedAgreement)
        res.status(200).json(updatedAgreement);
    } catch (error) {
        console.error('Error updating agreement:', error);
        res.status(500).json({ error: 'An error occurred while updating the agreement.' });
    }
}

module.exports.deleteAgreement = async (req, res) => {
    try {
        const { id } = req.params; 
        const deletedAgreement = await Contract.findByIdAndDelete(id);

        if (!deletedAgreement) {
            return res.status(404).json({ error: 'Agreement not found' });
        }
        console.log(deletedAgreement)
        res.status(200).json({ message: 'Agreement deleted successfully' });
    } catch (error) {
        console.error('Error deleting agreement:', error);
        res.status(500).json({ error: 'An error occurred while deleting the agreement.' });
    }
}

module.exports.createAgreement = async (req, res) => {
    try {
        const { id,expirationDate,userid} = req.body;
        // const cloudinaryUrl = req.file.path; // Get the Cloudinary URL from the uploaded file

        const agreement = new Contract({
            id,
            userid:userid,
            status: 'draft',
            expirationDate,
        });

        await agreement.save();
        console.log(agreement)
        res.status(201).json(agreement);
    } catch (error) {
        console.error('Error creating agreement:', error);
        res.status(500).json({ error: 'An error occurred while creating the agreement.' });
    }
}

module.exports.addChatHistory = async (req, res) => {
    try {
        const { id } = req.params;
        const msg = req.body.content;

        const result = await Contract.find({ id: id });
        if (result.length === 0) {
            return res.status(404).send({ success: false, msg: 'Id does not exist' });
        }

        const updatedAgreement = await Contract.findOneAndUpdate(
            { id: id },
            { chatHistory: msg },
            { new: true }
        );

        if (!updatedAgreement) {
            return res.status(404).json({ success: false, error: 'Agreement not found' });
        }

        res.status(200).json(updatedAgreement);
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, error: err.message });
    }
};

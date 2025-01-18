const mongoose = require('mongoose');

const agreementSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String },
    terms: { type: String}, 
    user : {type:String},
    //url:{type:String},
    //cloudinaryUrl: { type: String, required: true }, 
    status: { type: String, enum: ['draft', 'sent', 'signed', 'expired'], default: 'draft' },
    expirationDate: { type: Date },
    //createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User ' },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    pineconePrefix:{ type: String, },
    markDown : {type : String},
});

const Agreement = mongoose.model('Agreement', agreementSchema);

module.exports = Agreement;
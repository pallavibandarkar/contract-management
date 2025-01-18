const mongoose = require('mongoose');

const agreementSchema = new mongoose.Schema({
    id:{type:String,required:true,unique:true},
    userid:{type:String,required:true,unique:true},
    expirationDate: { type: String },
    status: { type: String, enum: ['draft', 'sent', 'signed', 'expired'], default: 'draft' },
    //createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User ' },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});

const Agreement = mongoose.model('Agreement', agreementSchema);

module.exports = Agreement;
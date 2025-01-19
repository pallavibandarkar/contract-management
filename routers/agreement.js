const express = require('express');
const agreement = express.Router();
const Agreement = require("../models/agreement.js");
const agreementControllers = require("../controller/agreement.js")

agreement.use(express.json());
agreement.use(express.urlencoded({ extended: true }));


agreement.post('/agreements',agreementControllers.createAgreement);

agreement.put('/agreements/:id', agreementControllers.updateAgreement);

agreement.delete('/agreements/:id', agreementControllers.deleteAgreement);

agreement.get("/agreements",agreementControllers.getAgreements)

agreement.put("/chatHistory/:id",agreementControllers.addChatHistory)

module.exports = agreement;
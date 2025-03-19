const express = require("express");
const router = express.Router();
const {send} = require("../controllers/mail.js")
const { validatorMail } = require('../validators/email.js');

router.post("/", validatorMail,send)

module.exports = router
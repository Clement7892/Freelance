const express = require("express");
const router = express.Router();
const mailController = require('../controllers/send-mail');

router.post('/send-email', mailController.sendEmail);

module.exports = router;

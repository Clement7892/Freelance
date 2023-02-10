const Company = require("../models/company.model");
const bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");
const nodemailer = require('nodemailer');

exports.registerCompany = async (req, res, next) => {
  const newCompany = new Company({
    name: req.body.name,
    status: req.body.status,
    address: req.body.address,
    city: req.body.city,
    postalCode: req.body.postalCode,
    numberSiret: req.body.numberSiret,
    email: req.body.email,
  });

  try {
    const newCompanyToSave = await newCompany.save();
    const transporter = nodemailer.createTransport({
      host: 'smtp.ethereal.email',
      port: 587,
      auth: {
        user: 'emory30@ethereal.email',
        pass: 'QjmWVMAsSdHdMZSbT6'
      }
    });
    const mailOptions = {
      from: 'clement.roc2002@gmail.com',
      to: req.body.email,
      subject: 'Bienvenue sur notre plateforme',
      text: 'Merci de vous être enregistré!',
    };
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error);
        next(error);
      }
      console.log('Email sent: ', info.res);
    });
    return res.send(newCompanyToSave);
  } catch (err) {
    next(err);
  }
};

exports.loginCompany = (req, res, next) => {
  Company.findOne({ email: req.body.email }).then((company) => {
    if (!company) {
      return res.status(404).send({
        message: "Company not found",
      });
    }
    let numberSiretValid = bcrypt.compareSync(
      req.body.numberSiret,
      company.numberSiret
    );
    if (!numberSiretValid) {
      return res.status(401).send({
        message: "Number Siret not valid",
        auth: false,
      });
    }
    let companyToken = jwt.sign(
      {
        id: company._id,
      },
      process.env.JWT_SECRET
    );
    res.send({
      message: "Company logged",
      auth: true,
      token: companyToken,
    });
  });
};
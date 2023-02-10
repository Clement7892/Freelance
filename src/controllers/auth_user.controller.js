const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const nodemailer = require('nodemailer');
var jwt = require("jsonwebtoken");

exports.registerUser = async (req, res, next) => {
  const newUser = new User({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    address: req.body.address,
    city: req.body.city,
    postalCode: req.body.postalCode,
    phoneNumber: req.body.phoneNumber,
    email: req.body.email,
    password: req.body.password,
  });

  try {
    const newUserToSave = await newUser.save();
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
    return res.send(newUserToSave);
  } catch (err) {
    next(err);
  }
};

exports.loginUser = (req, res, next) => {
  User.findOne({ email: req.body.email })
    .then((user) => {
      if (!user) {
        return res.status(404).send({
          message: "User not found",
        });
      }
      let passwordValid = bcrypt.compareSync(req.body.password, user.password);
      if (!passwordValid) {
        return res.status(401).send({
          message: "Password not valid",
          auth: false,
        });
      }
      let userToken = jwt.sign(
        {
          id: user._id,
          isAdmin: user.isAdmin,
        },
        process.env.JWT_SECRET
      );
      res.send({
        message: "User logged",
        auth: true,
        token: userToken,
      });
    })
    .catch((err) => res.status(400).send(err));
};

exports.updateUser = (req, res) => {
  User.findByIdAndUpdate(req.params.id, req.body)
    .then((user) => {
      if (!user) {
        return res.status(404).send({
          message: "user not found",
        });
      }
      User.findById(user._id).then((userupdated) => {
        res.send(userupdated);
      });
    })
    .catch((err) => res.status(400).send(err));
};
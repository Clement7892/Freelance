const { body, validationResult } = require("express-validator");

exports.checkNameCompany = [
  body("email").isEmail().withMessage("Email format not valid"),
];

exports.chekIdentityCompany = [
  body("status").isAlphanumeric().withMessage("Status format is not valide"),
  body("address").isAlphanumeric().withMessage("Address format is not valide"),
  body("city").isAlphanumeric().withMessage("City format is not valide"),
  body("postalCode").isAlphanumeric().withMessage("Postal Code format is not valide"),
  body("city").isAlphanumeric().withMessage("City format is not valide"),
  body("name").isAlphanumeric().withMessage("Name format not valid"),
];

exports.checkPasswordCompany = [
  body("numberSiret")
    .notEmpty()
    .isLength({ length: 14 })
    .matches(/^[A-Za-a0-9 .,'!&(§è!çà)]+$/),
];

exports.validationCompany = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).send({
      errors: errors.array(),
    });
  }
  next();
};

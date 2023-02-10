const { body, validationResult } = require("express-validator");

exports.checkEmailUser = [
  body("email").isEmail().withMessage("Email format not valid"),
];

exports.checkIdentityUser = [
  body("firstName")
    .isAlphanumeric()
    .withMessage("FirstName format is not valide"),
  body("lastName")
    .isAlphanumeric()
    .withMessage("LastName format is not valide"),
  body("address")
    .isAlphanumeric()
    .withMessage("Address format is not valide"),
  body("city")
    .isAlphanumeric()
    .withMessage("City format is not valide"),
  body("postalCode")
    .isAlphanumeric()
    .withMessage("PostalCode format is not valide"),
  body("phoneNumber")
    .isAlphanumeric()
    .withMessage("phoneNumber format is not valide"),
];

exports.checkPasswordUser = [
  body("password")
    .notEmpty()
    .isLength({ min: 11, max: 30 })
    .matches(/^[A-Za-z0-9 .,'!&(§è!çà)]+$/),
];

exports.validationUser = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).send({
      errors: errors.array(),
    });
  }
  next();
};

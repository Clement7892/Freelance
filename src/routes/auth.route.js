const express = require('express');
const router = express.Router();

const authControllerCompany = require('../controllers/auth_company.controller');
const { checkNameCompany, chekIdentityCompany, checkPasswordCompany, validationCompany } = require('../middlewares/validators_company.middleware');
router.post('/registerCompany', checkNameCompany, chekIdentityCompany, checkPasswordCompany, validationCompany, authControllerCompany.registerCompany);
router.post('/loginCompany', checkNameCompany, checkPasswordCompany, validationCompany, authControllerCompany.loginCompany);


const verifyTokenUser = require('../middlewares/verifyTokenUser');
const authControllerUser = require('../controllers/auth_user.controller');
const { checkEmailUser, checkIdentityUser, checkPasswordUser, validationUser } = require('../middlewares/validators_user.middleware');
router.post('/registerUser', checkEmailUser, checkIdentityUser, checkPasswordUser, validationUser,authControllerUser.registerUser);
router.post('/loginUser', checkEmailUser, checkPasswordUser, validationUser, authControllerUser.loginUser);
router.put('/updateUser/:id', verifyTokenUser, authControllerUser.updateUser);


module.exports = router;
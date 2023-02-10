const express = require('express');
const router = express.Router();

const verifyTokenIsAdmin = require('../middlewares/verifyTokenIsAdmin');
const verifyTokenUser = require('../middlewares/verifyTokenUser');
const isAdmin = require('../controllers/isAdmin_user.controller')

router.delete('/deleteUser/:id', verifyTokenUser, verifyTokenIsAdmin, isAdmin.deleteUser);
router.put('/updateUser/:id', verifyTokenUser, verifyTokenIsAdmin, isAdmin.updateUser);
router.get('/findUser', verifyTokenUser, verifyTokenIsAdmin, isAdmin.getUser);
router.get('/findMission', verifyTokenUser, verifyTokenIsAdmin, isAdmin.getMission);

module.exports = router;
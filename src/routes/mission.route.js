const express = require('express');
const router = express.Router();

const verifyTokenCompany = require('../middlewares/verifyTokenCompany') 
const missionController = require('../controllers/company_mission.controller');
const allMissionController = require('../controllers/user_mission')
const verifyTokenUser = require('../middlewares/verifyTokenUser');

router.get('/createMission', verifyTokenCompany, missionController.createMission);
router.delete('/deleteMission/:id', verifyTokenCompany, missionController.deleteMission);
router.put('/updateMission/:id', verifyTokenCompany, missionController.updateMission);
router.get("/allMission", verifyTokenUser, allMissionController.allMission);
router.patch("/joinMission", verifyTokenUser, allMissionController.joinMission);
router.post("/invite/:missionId", verifyTokenCompany, missionController.inviteMission);

module.exports = router;
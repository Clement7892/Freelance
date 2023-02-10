const express = require("express");
const router = express.Router();

const authRouter = require("./auth.route");
const missionRouter = require("./mission.route")
const isAdmin = require("./isAdmin.route")

router.use("/auth", authRouter);
router.use("/mission", missionRouter);
router.use("/isAdmin", isAdmin);

module.exports = router;
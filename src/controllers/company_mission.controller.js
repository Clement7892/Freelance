const Mission = require("../models/mission.model");
const User = require("../models/user.model");
const nodemailer = require("nodemailer");

exports.createMission = async (req, res, next) => {
  const newMission = new Mission({
    title: req.body.title,
    description: req.body.description,
    totalAmount: req.body.totalAmount,
    dateStart: req.body.dateStart,
    dateFinish: req.body.dateFinish,
    status: req.body.status,
    skill: req.body.skill,
    job: req.body.job,
    participants: []
  });

  try {
    const newMissionToSave = await newMission.save();
    return res.send(newMissionToSave);
  } catch (err) {
    next(err);
  }
};

exports.deleteMission = (req, res) => {
  Mission.findByIdAndDelete(req.params.id)
    .then((mission) => {
      res.send(mission);
    })
    .catch((err) => res.status(400).send(err));
};

exports.updateMission = (req, res) => {
  Mission.findByIdAndUpdate(req.params.id, req.body)
    .then((mission) => {
      if (!mission) {
        return res.status(404).send({
          message: "mission not found",
        });
      }
      Mission.findById(mission._id).then((missionupdated) => {
        res.send(missionupdated);
      });
    })
    .catch((err) => res.status(400).send(err));
};

exports.inviteMission = (req, res) => {
  const transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    auth: {
      user: "emory30@ethereal.email",
      pass: "QjmWVMAsSdHdMZSbT6",
    },
  });
  Mission.findById(req.params.missionId)
  .then(mission => {
    if (!mission) {
      return res.status(404).json({ message: 'Mission not found' });
    }
    if (mission.participants.length >= 3) {
      return res.status(400).json({ message: 'The mission already has 3 participants' });
    }
    User.findById(req.body.userId)
      .then(user => {
        if (!user) {
          return res.status(404).json({ message: 'User not found' });
        }
        transporter.sendMail({
          from: 'clement.roc2002@gmail.com',
          to: user.email,
          subject: 'You have been invited to a mission',
          html: `<p>Dear ${user.name},</p><p>You have been invited to the mission "${mission.title}".</p><p>Best regards,</p><p>The Example Team</p>`
        });
        transporter.sendMail({
          from: 'clement.roc2002@gmail.com',
          to: 'clement.roc2002@gmail.com',
          subject: 'A user has been invited to a mission',
          html: `<p>Dear Admin,</p><p>The user "${user.name}" (${user.email}) has been invited to the mission "${mission.title}".</p><p>Best regards,</p><p>The Example Team</p>`
        });
        mission.participants.push(user._id);
        mission.save();
        res.json({ message: 'User invited to the mission successfully' });
      })
      .catch(err => {
        res.status(500).json({ message: err });
      });
  })
  .catch(err => {
    res.status(500).json({ message: err });
  });
};
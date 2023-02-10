const Mission = require("../models/mission.model");
const User = require("../models/user.model");
const nodemailer = require("nodemailer");

exports.allMission = (req, res) => {
  Mission.find()
    .then((missions) => res.send(missions))
    .catch((err) => res.status(400).send(err));
};

exports.joinMission = (req, res) => {
  const transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    auth: {
      user: "emory30@ethereal.email",
      pass: "QjmWVMAsSdHdMZSbT6",
    },
  });
  Mission.findById(req.params.missionId)
    .then((mission) => {
      if (!mission) {
        return res.status(404).json({ message: "Mission not found" });
      }
      if (mission.participants.length >= 3) {
        return res.status(400).json({ message: "Mission is full" });
      }

      User.findById(req.body.userId)
        .then((user) => {
          if (!user) {
            return res.status(404).json({ message: "User not found" });
          }
          mission.participants.push(user._id);
          mission
            .save()
            .then((mission) => {
              transporter.sendMail({
                from: "clement.roc2002@gmail.com",
                to: user.email,
                subject: "You have joined a mission",
                html: `<p>Dear ${user.name},</p><p>You have successfully joined the mission "${mission.title}".</p><p>Best regards,</p><p>The Example Team</p>`,
              });

              transporter.sendMail({
                from: "clement.roc2002@gmail.com",
                to: "clement.roc2002@gmail.com",
                subject: "A user has joined a mission",
                html: `<p>Dear Admin,</p><p>The user "${user.name}" (${user.email}) has joined the mission "${mission.title}".</p><p>Best regards,</p><p>The Example Team</p>`,
              });

              res.json({ message: "User joined the mission successfully" });
            })
            .catch((err) => {
              res.status(500).json({ message: err });
            });
        })
        .catch((err) => {
          res.status(500).json({ message: err });
        });
    })
    .catch((err) => {
      res.status(500).json({ message: err });
    });
};

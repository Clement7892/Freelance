const User = require("../models/user.model");
const Mission = require("../models/mission.model");

exports.deleteUser = (req, res) => {
  User.findByIdAndDelete(req.params.id)
    .then((user) => {
      res.send(user);
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

exports.getUser = (req, res) => {
  User.findById(req.userToken.id)
    .then((user) => {
      if (!user) {
        return res.status(404).send({
          message: "user not found",
        });
      }
      res.send(user);
    })
    .catch((err) => res.status(400).send(err));
};

exports.getMission = (req, res) => {
  Mission.findById(req.missionToken.id)
    .then((mission) => {
      if (!mission) {
        return res.status(404).send({
          message: "mission not found",
        });
      }
      res.send(mission);
    })
    .catch((err) => res.status(400).send(err));
};

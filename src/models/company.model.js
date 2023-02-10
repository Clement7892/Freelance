const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const companySchema = mongoose.Schema(
  {
    name: {
      type: String,
      require: true,
    },
    status: {
      type: String,
      require: true,
    },
    address: {
      type: String,
      require: true,
      maxLength: 50,
      minLength: 2,
    },
    city: {
      type: String,
      require: true,
      maxLength: 50,
      minLength: 2,
    },
    postalCode: {
      type: Number,
      require: true,
      length: 5,
    },
    numberSiret: {
      type: String,
      require: true,
      unique: true,
      length: 14,
    },
    email: {
      type: String,
      required: true,
      lowercase: true,
      unique: true,
      length: 50,
    },
  },
  {
    timestamps: true,
  }
);

companySchema.pre("save", function (next) {
  if (!this.isModified("numberSiret")) {
    return next();
  }

  bcrypt.hash(this.numberSiret, 10, (err, hashedPassword) => {
    if (err) {
      console.log(err);
      return next(err);
    }
    this.numberSiret = hashedPassword;
    next();
  });
});

module.exports = mongoose.model("Company", companySchema);

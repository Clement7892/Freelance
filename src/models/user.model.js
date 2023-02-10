const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = mongoose.Schema(
  {
    firstName: {
      type: String,
      require: true,
      maxLength: 50,
      minLength: 2,
    },
    lastName: {
      type: String,
      require: true,
      maxLength: 50,
      minLength: 2,
    },
    address: {
      type: String,
      require: true,
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
    phoneNumber: {
      type: Number,
      require: true,
      unique: true,
      length: 10,
    },
    email: {
      type: String,
      required: true,
      lowercase: true,
      unique: true,
      length: 50,
    },
    password: {
      type: String,
      required: true,
      minLength: 11,
      maxLength: 30,
    },
    isAdmin: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", function (next) {
  if (!this.isModified("password")) {
    return next();
  }

  bcrypt.hash(this.password, 10, (err, hashedPassword) => {
    if (err) {
      console.log(err);
      return next(err);
    }
    this.password = hashedPassword;
    next();
  });
});

module.exports = mongoose.model("User", userSchema);

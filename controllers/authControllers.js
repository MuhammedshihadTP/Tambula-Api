const user = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

//for login and registration

module.exports = {
  registration: async (req, res, next) => {
    try {
      let { password, email } = req.body;
      const userExist = await user.findOne({ email: email });
      if (userExist) {
        return res.status(400).json({
          message: "User already exists",
        });
      } else {
        bcrypt.hash(password, 10).then((hashedPassword) => {
          req.body.password = hashedPassword;
          const newUser = new user(req.body);
          newUser.save();
        });
        res.status(200).json({ msg: "successfuly created" });
      }
    } catch (error) {
      next(error);
      
    }
  },

  login: async (req, res, next) => {
    try {
      const { email, password } = req.body;
      const User = await user.findOne({ email: email });
      if (!User) {
        return res.status(400).json({
          message: "User does not exist",
        });
      } else {
        const isMatch = await bcrypt.compare(password, User.password);
        if (!isMatch) {
          return res.status(400).json({
            message: "Password is incorrect",
          });
        }
        const token = jwt.sign({ userId: User._id }, process.env.JWT_SECRET, {
          expiresIn: "1h",
        });
        
        res.status(200).json({
          token,
          user: User,
        });
      }
    } catch (error) {
      next(error);
      
    }
  },
};

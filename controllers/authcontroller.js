const jwt = require("jsonwebtoken");
const usermodels = require("../models/usermodels");
const bcrypt = require('bcryptjs');

// registering the user for the first
const registerController = async (req, res) => {

    try {
        const exisitingUser = await usermodels.findOne({ email: req.body.email });
        //validation
        if (exisitingUser) {
          return res.status(200).send({
            success: false,
            message: "User Already exists",
          });
        }
        //hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);
        req.body.password = hashedPassword;
        //rest data
        const user = new usermodels(req.body);
        await user.save();
        return res.status(201).send({
          success: true,
          message: "User Registerd Successfully",
          user,
        });
      } catch (error) {
        console.log(error);
        res.status(500).send({
          success: false,
          message: "Error In Register API",
          error,
        });
      }
};


// now then login in the existing user
const logincontroller = async (req, res) => { // callback funstion

    try {
        const user = await usermodels.findOne({ email: req.body.email });
        if (!user) {
          return res.status(404).send({
            success: false,
            message: "Invalid Credentials",
          });
        }
        //check role
        if (user.rule !== req.body.rule) {
          return res.status(500).send({
            success: false,
            message: "role dosent match",
          });
        }
        //compare password
        const comparePassword = await bcrypt.compare(
          req.body.password,
          user.password
        );
        if (!comparePassword) {
          return res.status(500).send({
            success: false,
            message: "Invalid Credentials",
          });
        }
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
          expiresIn: "1d",
        });
        return res.status(200).send({
          success: true,
          message: "Login Successfully",
          token,
          user,
        });
      } catch (error) {
        console.log(error);
        res.status(500).send({
          success: false,
          message: "Error In Login API",
          error,
        });
      }
};

const middlewarecontroller = async (req, res) => {

    try {
        const user = await usermodels.findOne({ _id: req.body.userId });
        return res.status(200).send({
          success: true,
          message: "User Fetched Successfully",
          user,
        });
      } catch (error) {
        console.log(error);
        return res.status(500).send({
          success: false,
          message: "unable to get current user",
          error,
        });
      }
};

module.exports = {registerController, logincontroller, middlewarecontroller};
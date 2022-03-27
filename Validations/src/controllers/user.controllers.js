const express = require("express");
const { body, validationResult } = require("express-validator");

const User = require("../models/user.model");

const router = express.Router();

router.post(
  "/",
  body("firstName")
    .not()
    .isEmpty()
    .withMessage("First Name cannot be empty")
    .isLength({ min: 4 })
    .withMessage("First Name must be at least 4 characters"),
    body("lastName")
    .not()
    .isEmpty()
    .withMessage("Last Name cannot be empty"),
  body("email")
    .isEmail()
    .custom(async (value) => {
      const user = await User.findOne({ email: value });

      if (user) {
        throw new Error("Email is already taken");
      }
      return true;
    }),
  body("age")
    .not()
    .isEmpty()
    .withMessage("Age cannot be empty")
    .isNumeric()
    .withMessage("Age must be a number between 1 and 100")
    .custom((val) => {
      if (val < 0 || val > 100) {
        throw new Error("Incorrect age provided");
      }
      return true;
    }),
  body("pincode")
    .not()
    .isEmpty()
    .withMessage("Pincode is required")
    .custom(async (val) => {
      if (val && val.length>6 ) {
        throw new Error("pincode can't be greater than 6 digits");
      }
      return true;
    }),
    body("gender")
    .not().isEmpty().withMessage("Gender can't be empty'")
    .custom(async(val)=>{
        if(val!=="Male") {
            throw new Error("Icorrect gender provided.")
        }
        return true;
    }),
    
  async (req, res) => {
    try {

      const errors = validationResult(req);
      console.log({ errors });
      if (!errors.isEmpty()) {
        return res.status(400).send({ errors: errors.array() });
      }

      const user = await User.create(req.body);

      return res.status(201).send(user);
    } catch (err) {
      return res.status(500).send({ message: err.message });
    }
  }
);

module.exports = router;



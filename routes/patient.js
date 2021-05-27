import express from 'express'
import {check, validationResult} from 'express-validator'
import AES from 'crypto-js/aes';
import patient from 'models/patient'

const router = express.Router();

router.post(
    "/",
    [
      check("name", "Name is required").not().isEmpty(),
      check("cnic", "cnic is required").not().isEmpty(),
      check("city", "city is required").not().isEmpty(),
      check("phone", "phone is required").not().isEmpty(),
      check("location", "location is required").not().isEmpty(),
      check("password", "Please enter a password with 6 or more characters")
        .not()
        .isEmpty(),
    ],
    async (req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ success: false, error: errors.array() });
      }
      const {
        fullName,
        email,
        password,
        phone,
        city,
        zone,
        location,
        profileImage,
        metadata,
      } = req.body;
      try {
        let user = await User.findOne({ email });
  
        if (user) {
          return res
            .status(400)
            .json({ success: false, error: "user already exsits" });
        }
        user = new User({
          email,
          password,
          role: "client",
        });
  
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);
        const newUser = await user.save();
        let client = new Clinet({
          fullName,
          phone,
          city,
          zone,
          location,
          profileImage,
          metadata,
          user_id: newUser._id,
        });
        const newclient = await client.save();
  
        return res.json({
          success: true,
          createdUser: {
            client_id: newclient._id,
            user_id: newUser._id,
            fullname: newclient.fullName,
          },
        });
      } catch (err) {
        return res.status(500).json({ success: false, error: err.message });
      }
    }
  );
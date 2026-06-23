import userModel from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    if (!name || !email || !password) {
      return res.status(400).json({ error: "Please provide all the fields" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const userData = {
      name,
      email,
      password: hashedPassword,
    };

    const newUser = new userModel(userData);
    const user = await newUser.save();

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    res
      .status(201)
      .json({
        user: {
          name: user.name,
          email: user.email,
          creditBalance: user.creditBalance,
        },
        token,
      });
  } catch (error) {
    res.status(500).json({ error: "Error creating user" });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(401).json({ error: "Incorrect Password" });
    } else {
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
      res
        .status(201)
        .json({
          user: {
            name: user.name,
            email: user.email,
            creditBalance: user.creditBalance,
          },
          token,  
        });
    }
  } catch (error) {
    res.status(500).json({ error: "Error logging in user" });
  }
};

const userCredits = async (req, res) => {
  try {
    const { userId } = req.body;


    const user = await userModel.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.status(200).json({ credits: user.creditBalance, user: {name: user.name} });
  } catch (error) {
    res.status(500).json({ error: "Error adding credits" });
  }
};

export { registerUser, loginUser, userCredits };

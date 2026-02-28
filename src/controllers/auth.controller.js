import User from "../model/users.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const handleUserSignup = async (req, res) => {
  try {
    const { email, username, password } = req.body;

    //Validate fields
    if (!email || !username || !password) {
      return res.status(400).json({ message: "All field required" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already registered" });
    }

    //Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    //Create user
    const create = await User.create({
      email,
      username,
      password: hashedPassword,
      role: "user",
    });

    //jwt created
    const token = jwt.sign(
      {
        userId: create._id,
        username: create.username,
        role: create.role,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      },
    );

    res.cookie("token", token, {
      httpOnly: true,
      secure: false, // true in production (HTTPS)
    });

    return res.redirect("/");
  } catch (error) {
    console.log("Error in handle user signup", error);
    res.status(400).json({ message: "Internal server error" });
  }
};

export const handleUserLogin = async (req, res) => {
  try {
    const { username, password } = req.body;

    //Validate fields
    if (!username || !password) {
      return res.status(400).json({ message: "All field required" });
    }

    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // check Hash password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    //jwt created
    const token = jwt.sign(
      {
        userId: user._id,
        username: user.username,
        role: user.role,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      },
    );

    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
    });

    return res.redirect("/");
  } catch (error) {
    console.log("Login error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

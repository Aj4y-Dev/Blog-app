import jwt from "jsonwebtoken";
import User from "../model/users.js";

export const checkUserAuth = async (req, res, next) => {
  const token = req.cookies.token;

  // If no token → redirect to signup
  if (!token) {
    return res.redirect("/signup");
  }
  try {
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(decoded._id || decoded.userId);

    // Only allow users with role "user"
    if (!user) return res.redirect("/signup");

    // Attach decoded info to req.user
    // Support both _id and userId for backward compatibility with existing sessions
    req.user = user;
    // Continue to the requested route
    next();
  } catch (error) {
    // Invalid token → redirect to signup
    return res.redirect("/signup");
  }
};

export const checkAdmin = (req, res, next) => {
  if (!req.user) {
    return res.status(401).send("Not authenticated");
  }

  if (req.user.role !== "admin") {
    return res.status(403).send("access denied");
  }
  next();
};

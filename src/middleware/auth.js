import jwt from "jsonwebtoken";

export const checkUserAuth = (req, res, next) => {
  const token = req.cookies.token;

  // If no token → redirect to signup
  if (!token) {
    return res.redirect("/signup");
  }
  try {
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Only allow users with role "user"
    if (decoded.role !== "user") {
      return res.redirect("/signup");
    }

    // Attach decoded info to req.user
    // Support both _id and userId for backward compatibility with existing sessions
    req.user = {
      ...decoded,
      _id: decoded._id || decoded.userId,
    };

    // Continue to the requested route
    next();
  } catch (error) {
    // Invalid token → redirect to signup
    return res.redirect("/signup");
  }
};

import express from "express";
import dotenv from "dotenv";
import path from "path";
import cookieParser from "cookie-parser";

import { connectDB } from "./connection.js";
import authRouter from "./src/routes/auth.route.js";
import blogRouter from "./src/routes/blog.route.js";
import { checkUserAuth } from "./src/middleware/auth.js";
import Blog from "./src/model/blog.js";

dotenv.config();

connectDB();

const app = express();
const PORT = process.env.PORT || 4000;

app.set("view engine", "ejs");
app.set("views", path.resolve("./src/views"));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.resolve("./public")));

app.use("/api/v1", authRouter);
app.use("/blog", checkUserAuth, blogRouter);

app.get("/", checkUserAuth, async (req, res) => {
  const blogs = await Blog.find({});
  res.render("home", { user: req.user, blogs: blogs });
});

app.get("/signup", (req, res) => {
  res.render("signup");
});

app.get("/login", (req, res) => {
  res.render("login");
});

app.get("/logout", (req, res) => {
  res.clearCookie("token").redirect("/");
});

app.listen(PORT, () => console.log(`server is listing in port ${PORT}`));

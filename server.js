import express from "express";
import dotenv from "dotenv";
import path from "path";
import cookieParser from "cookie-parser";

import { connectDB } from "./connection.js";
import authRouter from "./src/routes/auth.route.js";
import blogRouter from "./src/routes/blog.route.js";
import { checkUserAuth } from "./src/middleware/auth.js";

dotenv.config();

connectDB();

const app = express();
const PORT = process.env.PORT || 4000;

app.set("view engine", "ejs");
app.set("views", path.resolve("./src/views"));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/api/v1", authRouter);
app.use("/blog", blogRouter);

app.get("/", checkUserAuth, (req, res) => {
  res.render("home", { user: req.user });
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

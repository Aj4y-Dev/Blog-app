import express from "express";
import {
  handleUserSignup,
  handleUserLogin,
} from "../controllers/auth.controller.js";

const router = express.Router();

router.get("/signup", (req, res) => {
  return res.render("signup");
});

router.get("/login", (req, res) => {
  return res.render("login");
});

router.post("/signup", handleUserSignup);
router.post("/login", handleUserLogin);

export default router;

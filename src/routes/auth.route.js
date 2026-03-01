import express from "express";
import {
  handleUserSignup,
  handleUserLogin,
  handleUserLogout,
} from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/signup", handleUserSignup);
router.post("/login", handleUserLogin);
router.get("/logout", handleUserLogout);

export default router;

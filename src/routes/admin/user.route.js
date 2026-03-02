import express from "express";
import {
  handleAllUsers,
  handleUpdateUser,
  handleDeleteUser,
  getOneUser,
} from "../../controllers/admin/user.controller.js";

const router = express.Router();

router.get("/", handleAllUsers);
router.get("/edit/:id", getOneUser);
router.put("/update/:id", handleUpdateUser);
router.delete("/delete/:id", handleDeleteUser);

export default router;

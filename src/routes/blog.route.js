import express from "express";
import multer from "multer";
import path from "path";

import {
  getNewBlog,
  handleBlogs,
  getEditBlog,
  getSingleBlog,
  updateSingleBlog,
  deleteSingleBlog,
} from "../controllers/blog.controller.js";

const router = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.resolve(`./public/uploads`));
  },
  filename: function (req, file, cb) {
    const fileName = `${Date.now()}-${file.originalname}`;
    cb(null, fileName);
  },
});

const upload = multer({ storage: storage });

router.get("/add-new", getNewBlog);
router.post("/", upload.single("coverImage"), handleBlogs);
router.get("/:id", getSingleBlog);
router.get("/edit/:id", getEditBlog);
router.post("/update/:id", upload.single("coverImage"), updateSingleBlog);
router.get("/delete/:id", deleteSingleBlog);

export default router;

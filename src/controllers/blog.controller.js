import Blog from "../model/blog.js";

export const getNewBlog = async (req, res) => {
  return res.render("addBlog", {
    user: req.user,
  });
};

export const getSingleBlog = async (req, res) => {};

export const getAllBlogs = async (req, res) => {};

export const updateSingleBlog = async (req, res) => {};

export const deleteSingleBlog = async (req, res) => {};

export const handleBlogs = async (req, res) => {
  const { title, body } = req.body;
  console.log("Creating blog with user:", req.user);
  const blog = await Blog.create({
    body,
    title,
    createdBy: req.user._id,
    coverImageURL: `/uploads/${req.file.filename}`,
  });
  return res.redirect(`/blog/${blog._id}`);
};

import Blog from "../model/blog.js";

export const getNewBlog = async (req, res) => {
  return res.render("addBlog", {
    user: req.user,
  });
};

export const handleBlogs = async (req, res) => {
  const { title, body } = req.body;
  const blog = await Blog.create({
    body,
    title,
    createdBy: req.user.userId,
    coverImageURL: `/uploads/${req.file.filename}`,
  });
  return res.redirect("/");
};

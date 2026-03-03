import Blog from "../model/blog.js";

export const getNewBlog = async (req, res) => {
  return res.render("addBlog", {
    user: req.user,
  });
};

export const getSingleBlog = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);

    if (!blog) {
      return res.status(404).send("Blog not found");
    }
    return res.render("blog", {
      user: req.user,
      blog,
    });
  } catch (error) {
    console.log("error to getSingleBlog user", error);
    return res.render("dashboard", { error: "Internal server error" });
  }
};

export const getEditBlog = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);

    if (!blog) {
      return res.status(404).send("Blog not found");
    }

    return res.render("editblog", {
      user: req.user,
      blog,
    });
  } catch (error) {
    console.log("error to getEditBlog user", error);
    return res.render("dashboard", { error: "Internal server error" });
  }
};

export const updateSingleBlog = async (req, res) => {
  try {
    const { title, body } = req.body;
    const updateData = { title, body };

    if (req.file) {
      updateData.coverImageURL = `/uploads/${req.file.filename}`;
    }

    const updatedBlog = await Blog.findByIdAndUpdate(
      req.params.id,
      { $set: updateData },
      {
        returnDocument: "after",
        runValidators: true,
      },
    );

    if (!updatedBlog) {
      return res.status(404).send("Blog not found");
    }

    return res.redirect("/");
  } catch (error) {
    console.log("error to update blog", error);
    return res.render("dashboard", { error: "Internal server error" });
  }
};

export const deleteSingleBlog = async (req, res) => {
  try {
    const deleteBlog = await Blog.findByIdAndDelete(req.params.id);
    if (!deleteBlog) {
      return res.status(404).send("Blog not found");
    }

    return res.redirect("/");
  } catch (error) {
    console.log("error to delete blog", error);
    return res.render("dashboard", { error: "Internal server error" });
  }
};

export const handleBlogs = async (req, res) => {
  const { title, body } = req.body;
  const blog = await Blog.create({
    body,
    title,
    createdBy: req.user._id,
    coverImageURL: `/uploads/${req.file.filename}`,
  });
  return res.redirect(`/blog/${blog._id}`);
};

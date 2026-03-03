import User from "../../model/users.js";
import Blog from "../../model/blog.js";

export const handleAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    const blogs = await Blog.find().populate("createdBy", "username");
    return res.render("dashboard", { user: req.user, users, blogs });
  } catch (error) {
    console.log("error to get all users", error);
    return res.render("dashboard", { error: "Internal server error" });
  }
};

export const getOneUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).send("User not found");
    }

    return res.render("editUser", { user });
  } catch (error) {
    console.log("error to get getUser", error);
    return res.render("dashboard", { error: "Internal server error" });
  }
};

export const handleUpdateUser = async (req, res) => {
  try {
    const { username, email, role } = req.body;
    //console.log(req.user.role);
    const updateData = { username, email };
    if (req.user && req.user.role === "admin" && role) {
      updateData.role = role; // allow role update only for admin
    }

    const updateUser = await User.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true }, // returns updated document
    );

    if (!updateUser) {
      return res.status(404).send("User not found");
    }

    return res.redirect("/dashboard");
  } catch (error) {
    console.log("error to get update user", error);
    return res.render("dashboard", { error: "Internal server error" });
  }
};

export const handleDeleteUser = async (req, res) => {
  try {
    const deleteUser = await User.findByIdAndDelete(req.params.id);

    if (!deleteUser) {
      return res.status(404).send("User not found");
    }

    return res.redirect("/dashboard");
  } catch (error) {
    console.log("error to get delete user", error);
    return res.render("dashboard", { error: "Internal server error" });
  }
};

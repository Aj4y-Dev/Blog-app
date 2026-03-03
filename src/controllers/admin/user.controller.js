import User from "../../model/users.js";

export const handleAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    return res.render("dashboard", { user: req.user, users });
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
    console.log("error to get get user", error);
    return res.render("dashboard", { error: "Internal server error" });
  }
};

export const handleUpdateUser = async (req, res) => {
  try {
    const updateUser = await User.findByIdAndUpdate(req.params.id, req.body, {
      returnDocument: "after", //After updating the document, return the new updated version.
    });

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

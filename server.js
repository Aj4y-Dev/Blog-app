import express from "express";
import dotenv from "dotenv";
import path from "path";

import { connectDB } from "./connection.js";
import authRouter from "./src/routes/auth.route.js";

dotenv.config();

connectDB();

const app = express();
const PORT = process.env.PORT || 4000;

app.set("view engine", "ejs");
app.set("views", path.resolve("./src/views"));

app.use(express.json());

app.use("/api/v1", authRouter);

app.get("/", (req, res) => {
  res.render("home");
});

app.listen(PORT, () => console.log(`server is listing in port ${PORT}`));

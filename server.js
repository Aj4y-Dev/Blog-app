import express from "express";
import dotenv from "dotenv";

import { connectDB } from "./connection.js";
import authRouter from "./src/routes/auth.route.js";

dotenv.config();

connectDB();

const app = express();
const PORT = process.env.PORT || 4000;

app.use(express.json());

app.use("/api/v1", authRouter);

app.get("/", (req, res) => {
  res.send("this is / root route");
});

app.listen(PORT, () => console.log(`server is listing in port ${PORT}`));

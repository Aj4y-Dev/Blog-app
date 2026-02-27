import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_DB_URL);
    console.log("Database connected");
  } catch (error) {
    console.error("DB connection failed", error);
    process.exit(1); // immediately stops the Node.js ap, 0 ->success (normal shutdown), 1 -> Error (something failed)
  }
};

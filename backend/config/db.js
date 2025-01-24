import mongoose from "mongoose";

const MONGO_URL = "mongodb://127.0.0.1:27017/Canteeno";
const dbUrl = process.env.DB_URL;
export const connectDB = async () => {
  await mongoose
    .connect(MONGO_URL)
    .then(() => {
      console.log("connected to db");
    })
    .catch((err) => {
      console.log(err);
    });
};

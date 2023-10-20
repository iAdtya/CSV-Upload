import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const uri = process.env.uri;

export const connectDB = async () => {
  try {
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("mongoose connected :: Atlas Cluster");
  } catch (error) {
    console.log(`error in connecting to the database :: ${error}`);
  }
};

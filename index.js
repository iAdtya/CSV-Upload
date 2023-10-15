import express from "express";
import  routes  from "./routes/index.js";

const app = express();

import dotenv from "dotenv";
dotenv.config();

import { connectDB } from "./config/mongoose.js";

const port = process.env.port || 8001;

app.set("view engine", "ejs");
app.set("views", "./views");

app.use(express.urlencoded({ extended: true }));

app.use(express.static("./assets"));

app.use("/", routes);

app.listen(port, async (error) => {
  if (error) {
    console.log(`error in running the server :: ${error}`);
    return;
  }
  console.log(`server is running on port :: ${port}`);
  await connectDB();
});


import express from "express";
import routes from "./routes/index.js";
import responseTime from "response-time";
import client from "prom-client";

const app = express();

import dotenv from "dotenv";
dotenv.config();

import { connectDB } from "./config/mongoose.js";

const port = process.env.port || 8001;

app.set("view engine", "ejs");
app.set("views", "./views");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static("./assets"));

app.use("/", routes);

const collectDefaultMetrics = client.collectDefaultMetrics;

const Registry = client.Registry;
const register = new Registry();
collectDefaultMetrics({ register });

const reqResTime = new client.Histogram({
  name: "http_express_req_res_time",
  help: "this tells how much time is taken by req and res",
  labelNames: ["method", "route", "status_code"],
  buckets: [1, 5, 15, 50, 100, 500, 1000, 2000],
});

const totalRequests = new client.Counter({
  name: "total_requests",
  help: "this tells the total number of requests",
});

app.use(
  responseTime((req, res, time) => {
    totalRequests.inc();
    reqResTime
      .labels({
        method: req.method,
        route: req.url,
        status_code: res.statusCode,
      })
      .observe(time);
  })
);

app.get("/metrics", async (req, res) => {
  res.setHeader("content-type", client.register.contentType);
  const metrics = await client.register.metrics();
  res.send(metrics);
});

//   await connectDB();

// app.listen(port, async (error) => {
//   if (error) {
//     console.log(`error in running the server :: ${error}`);
//     return;
//   }
//   console.log(`Server beating 💓 on port :: ${port}`);
// });


const startServer = async () => {
  try {
    await connectDB();
    console.log('MongoDB connected successfully');
    app.listen(port, () => {
      console.log(`Server beating 💓 on port :: ${port}`);
    });
  } catch (error) {
    console.log('Error connecting to MongoDB:', error);
  }
};

startServer();
import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import { authRoute } from "./router/auth.js";
import { routerPosts } from "./router/posts.js";
import { routerCate } from "./router/category.js";
import { routerDashboard } from "./router/dashboard.js";
import { userRoute } from "./router/user.js";

export const app = express();
const port = 5000;
app.use(cors());
app.use(express.json());
app.use("/api", authRoute);
app.use("/api", userRoute);
app.use("/api", routerPosts);
app.use("/api", routerCate);
app.use("/api", routerDashboard);
app.use("/api/public", express.static("./public"));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// RlZPJFLL5F7wlwS3
mongoose
  .connect("mongodb://0.0.0.0:27017/nodejs", {
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("connect success port", port);
  })
  .catch(() => {
    console.log("connect failed ");
  });
// mongoose
//   .connect(
//     "mongodb+srv://khoa10688:RlZPJFLL5F7wlwS3@cluster0.mb2qvkx.mongodb.net/",
//     {
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//     }
//   )
//   .then(() => {
//     console.log("connect success port", port);
//   })
//   .catch(() => {
//     console.log("connect failed ");
//   });

app.listen(port, () => {
  console.log("server is running port", port);
});

import express from "express";
import cors from "cors";
import path from "path";
const __dirname = path.resolve();

import authRouter from "./routes/auth.mjs";
import commentRouter from "./routes/comment.mjs";
import postRouter from "./routes/post.mjs";
import feedRouter from "./routes/feed.mjs";

const app = express();
app.use(express.json()); // body parser
// app.use(cors());

app.use("/api/v1/", authRouter);

app.use((req, res, next) => {
  const token = "valid";
  if (token === "valid") {
    next();
  } else {
    res.send({ msg: "invalid token" });
  }
});

app.use("/api/v1", commentRouter);
app.use("/api/v1", postRouter);
app.use("/api/v1", feedRouter);

// GET     /api/v2/user/:userId/:postId
// GET     /api/v2/users/:userId
// POST    /api/v2/user
// PUT     /api/v2/user/:userId/:postId
// DELETE  /api/v2/user/:userId/:postId

app.post("/api/v1/weather", (req, res, next) => {
  console.log("req.body: ", req.body);

  // res.send("weather is normal"); // not recommended
  res.send({
    msg: "weather is normal",
    temp: 23,
    humidity: 10,
  });
});

app.post("/api/v2/weather", (req, res, next) => {
  console.log("req.body: ", req.body);

  // res.send("weather is normal"); // not recommended
  res.send({
    msg: "weather is normal",
    temp: 23,
    humidity: 10,
  });
});

//       /static/vscode_windows.zip
app.use("/static", express.static(path.join(__dirname, "static")));

app.use(express.static(path.join(__dirname, "public")));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});

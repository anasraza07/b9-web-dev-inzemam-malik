import express from "express";
import cors from "cors";
import path from "path";
import jwt from "jsonwebtoken"
const __dirname = path.resolve();
import "dotenv/config"

import authRouter from "./routes/auth.mjs";
import commentRouter from "./routes/comment.mjs";
import postRouter from "./routes/post.mjs";
import feedRouter from "./routes/feed.mjs";
import cookieParser from 'cookie-parser';

const app = express();
app.use(express.json()); // body parser
app.use(cookieParser()); // cookie parser
// app.use(cors());

app.use("/api/v1/", authRouter);

//       /static/vscode_windows.zip
app.use("/static", express.static(path.join(__dirname, "static")));

app.use(express.static(path.join(__dirname, "public")));

app.use((req, res, next) => {
  const token = req.cookies.token;
  // console.log(token)

  try {
    const decoded = jwt.verify(token, `${process.env.SECRET}`)
    console.log("decoded: ", decoded)

    // const now = new Date().getT  ime()
    // if (decoded.expires > now) { // token is not expired
    req.body.decoded = {
      firstName: decoded.firstName,
      lastName: decoded.lastName,
      email: decoded.email,
      isAdmin: decoded.isAdmin
    }
    next();
    // }
    // else {
    //   res.status(401).send({ msg: "invalid token" });
    // }
  } catch (err) {
    res.status(401).send({ msg: "invalid token" });

  }

});

app.use("/api/v1", postRouter); // Secure api

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

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});

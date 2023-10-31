import express from "express";
const router = express.Router();

import authRouter from "./routes/auth.mjs";
import commentRouter from "./routes/comment.mjs";
import postRouter from "./routes/post.mjs";
import feedRouter from "./routes/feed.mjs";

router.use(authRouter);

router.use((req, res, next) => {
  const token = "valid";
  if (token === "valid") {
    next();
  } else {
    res.send({ msg: "invalid token" });
  }
});

router.use(commentRouter);
router.use(postRouter);
router.use(feedRouter);

// GET     /api/v2/user/:userId/:postId
// GET     /api/v2/users/:userId
// POST    /api/v2/user
// PUT     /api/v2/user/:userId/:postId
// DELETE  /api/v2/user/:userId/:postId

router.post("/weather", (req, res, next) => {
  console.log("req.body: ", req.body);

  // res.send("weather is normal"); // not recommended
  res.send({
    msg: "weather is normal",
    apiVersion: "v2",
    temp: 23,
    humidity: 10,
  });
});

export default router;

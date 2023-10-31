import express from "express";
import { nanoid } from "nanoid";
const router = express.Router();

// not recommended at all - server should be stateless
let posts = [
  {
    id: nanoid(),
    title: "first title",
    text: "some text of first post",
  },
];

// POST    /api/v1/post
router.post("/post", (req, res) => {
  console.log("post created!" + new Date());

  if (!req.body.title || !req.body.text) {
    res.status(403).send(`required parameters missing,
    example request body: 
    {
        title: "first title",
        text: "some text of first title",
    }`);
    return;
  }

  posts.unshift({
    id: nanoid(),
    title: req.body.title,
    text: req.body.text,
  });
  res.send("post created");
});

// GET     /api/v1/posts/:userId
router.get("/posts", (req, res) => {
  console.log("All posts are here" + new Date());
  res.send(posts);
});

// GET     /api/v1/post/:userId/:postId
router.get("/post/:postId", (req, res) => {
  console.log("post with id!" + new Date());

  if (isNaN(req.params.postId)) {
    res.send(`post id must be a number, no alphabet is allowed in post id`);
  }

  // map is not recommended bcuz map ko ham rok nhi skte
  for (let i = 0; i < posts.length; i++) {
    if (posts[i].id === Number(req.params.postId)) {
      console.log("post with id! (2)" + new Date());
      res.send(posts[i]);
      return;
    }
  }
  res.status(404).send("post not found with id " + req.params.postId);
});
// PUT     /api/v1/post/:userId/:postId
router.put("/post/:userId/:postId", (req, res) => {
  console.log("This is signup!" + new Date());
  res.send("post created");
});
// DELETE  /api/v1/post/:userId/:postId
router.delete("/post/:userId/:postId", (req, res) => {
  console.log("This is signup!" + new Date());
  res.send("post created");
});

export default router;

import express from "express";
import { nanoid } from "nanoid";
const router = express.Router();

// not recommended at all - server should be stateless
let posts = [
  // {
  //   id: nanoid(),
  //   title: "first title",
  //   text: "some text of first post",
  // },
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

  if (!req.params.postId) {
    res.status(403).send(`post id must be a valid id`);
  }

  // map is not recommended bcuz map ko ham rok nhi skte
  for (let i = 0; i < posts.length; i++) {
    if (posts[i].id === req.params.postId) {
      console.log("post with id! (2)" + new Date());
      res.send(posts[i]);
      return;
    }
  }
  res.status(404).send("post not found with id " + req.params.postId);
});

// DELETE  /api/v1/post/:userId/:postId
router.delete("/post/:postId", (req, res) => {
  if (!req.params.postId) {
    res.status(403).send(`post id must be a valid id`);
  }

  for (let i = 0; i < posts.length; i++) {
    if (posts[i].id === req.params.postId) {
      posts.splice(i, 1);
      res.send("post deleted");
      return;
    }
  }
  res.status(404).send("post not found with id " + req.params.postId);
  console.log("post deleted!" + new Date());
});

// PUT     /api/v1/post/:userId/:postId
// {
//   title: "updated title",
//   text: "updated text"
// }
router.put("/post/:postId", (req, res) => {
  if (!req.params.postId || !req.body.title || !req.body.text) {
    res.status(403).send(`example put body: 
    PUT     /api/v1/post/:userId/:postId
    {
      title: "updated title",
      text: "updated text"
    }
    `);
    return;
  }

  for (let i = 0; i < posts.length; i++) {
    if (posts[i].id === req.params.postId) {
      posts[i] = {
        id: nanoid(),
        title: req.body.title,
        text: req.body.text,
      };
      res.send("post upated with id " + req.params.postId);
      return;
    }
  }
  res.send("post not found with id");
});

export default router;

import express from "express";
const router = express.Router();

// GET     /api/v1/comment/:postId/:postId
router.get("/comment/:postId/:postId", (req, res) => {
  console.log("This is signup!" + new Date());
  res.send("post created");
});
// GET     /api/v1/comments/:postId
router.get("/comments/:postId", (req, res) => {
  console.log("This is all comments!" + new Date());
  res.send("Here is all comments!");
});
// PUT     /api/v1/comment/:postId/:postId
router.put("/comment/:postId/:postId", (req, res) => {
  console.log("This is signup!" + new Date());
  res.send("post created");
});
// DELETE  /api/v1/comment/:postId/:postId
router.delete("/comment/:postId/:postId", (req, res) => {
  console.log("This is signup!" + new Date());
  res.send("post created");
});

export default router;

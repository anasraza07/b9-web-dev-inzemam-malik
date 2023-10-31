import express from "express";
const router = express.Router();

// GET     /api/v1/comment/:postId/:commentId
router.get("/comment/:postId/:commentId", (req, res) => {
  console.log("All comments is here" + new Date(), req.params);
  res.send("All comments are here");
});
// GET     /api/v1/comments/:postId
router.get("/comments/:postId", (req, res) => {
  console.log("This is all comments!" + new Date());
  res.send("Here is all comments!");
});
// PUT     /api/v1/comment/:postId/:commentId
router.put("/comment/:postId/:commentId", (req, res) => {
  console.log("This is signup!" + new Date());
  res.send("post created");
});
// DELETE  /api/v1/comment/:postId/:commentId
router.delete("/comment/:postId/:commentId", (req, res) => {
  console.log("This is signup!" + new Date());
  res.send("post created");
});

export default router;

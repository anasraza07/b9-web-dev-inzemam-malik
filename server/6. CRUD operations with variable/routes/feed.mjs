import express from "express";
const router = express.Router();

// GET     /api/v1/feed/:userId
router.get("/feed/:userId", (req, res, next) => {
  console.log("post created");
  res.send("post created");
});

export default router;

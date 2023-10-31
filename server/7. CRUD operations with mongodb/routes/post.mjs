import express from "express";
import { nanoid } from "nanoid";
import { client } from "./../mongodb.mjs";
import { ObjectId } from "mongodb";

const db = client.db("cruddb");
const col = db.collection("posts");

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
router.post("/post", async (req, res) => {
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

  // Create a new document
  let newPost = {
    createdOn: new Date(),
    title: req.body.title,
    text: req.body.text,
  };
  // Insert the document into the specified collection
  try {
    const insertResponse = await col.insertOne(newPost);
    console.log(insertResponse);

    res.send("post created");
  } catch (err) {
    conosle.log("error inserting data mongodb  " + err);
    res.status(500).send("server error, please try again later!");
  }
});

// GET     /api/v1/posts/:userId
router.get("/posts", async (req, res) => {
  const cursor = col.find({}).sort({ _id: -1 }).limit(100);

  try {
    let results = await cursor.toArray();
    console.log("All posts are here" + new Date());
    res.send(results);
    // console.log(results);
  } catch (err) {
    conosle.log("error getting data mongodb  " + err);
    res.status(500).send("server error, please try again later!");
  }
});

// GET     /api/v1/post/:userId/:postId
router.get("/post/:postId", async (req, res) => {
  console.log("post with id!" + new Date());

  // if (!req.params.postId) {
  //   res.status(403).send(`post id must be a valid id`);
  //   return;
  // }

  if (!ObjectId.isValid(req.params.postId)) {
    res.status(403).send("Invalid post id");
    return;
  }

  // const cursor = col.find({ _id: new ObjectId(req.params.postId) });

  // const cursor = col.find({ price: { $lte: 77 } });
  // const cursor = col.find({
  //   $and: [
  //     { _id: req.params.postId },
  //     { title: "aahas hddb" },
  //   ],
  // });

  try {
    let result = await col.findOne({ _id: new ObjectId(req.params.postId) });
    console.log("result: " + result);
    res.send(result);
  } catch (err) {
    console.log("error getting data mongodb  " + err);
    res.status(500).send("server error, please try again later!");
  }

  // map is not recommended bcuz map ko ham rok nhi skte
  // for (let i = 0; i < posts.length; i++) {
  //   if (posts[i].id === req.params.postId) {
  //     console.log("post with id! (2)" + new Date());
  //     res.send(posts[i]);
  //     return;
  //   }
  // }
  // res.status(404).send("post not found with id " + req.params.postId);
});

// DELETE  /api/v1/post/:userId/:postId
router.delete("/post/:postId", async (req, res) => {
  if (!ObjectId.isValid(req.params.postId)) {
    res.status(403).send(`invalid post id`);
    return;
  }

  try {
    const deleteResponse = await col.deleteOne({
      _id: new ObjectId(req.params.postId),
    });
    console.log("deleteResponse: ", deleteResponse);
    res.send("post deleted");
  } catch (e) {
    console.log("error deleting in mongodb ", e);
    res.status(404).send("server error, please try again later");
  }
});

// PUT     /api/v1/post/:userId/:postId
// {
//   title: "updated title",
//   text: "updated text"
// }
router.put("/post/:postId", async (req, res) => {
  if (!ObjectId.isValid(req.params.postId)) {
    res.status(403).send("Invalid post id");
    return;
  }
  if (!req.body.title && !req.body.text) {
    res.status(403)
      .send(`required parameter missing, atleast one key is required,
      example put body: 
      PUT     /api/v1/post/:postId
    {
      title: "updated title",
      text: "updated text"
    }
    `);
    return;
  }

  let dataToBeUpdated = {};
  if (req.body.title) {
    dataToBeUpdated.title = req.body.title;
  }
  if (req.body.text) {
    dataToBeUpdated.text = req.body.text;
  }

  try {
    const updateResponse = await col.updateOne(
      {
        _id: new ObjectId(req.params.postId),
      },
      {
        $set: dataToBeUpdated,
      }
    );
    console.log(updateResponse);
    // console.log(dataToBeUpdated);

    res.send("post updated");
  } catch (err) {
    conosle.log("error inserting data mongodb  " + err);
    res.status(500).send("server error, please try again later!");
  }
});

export default router;

console.log("hello world from express server");

import express from "express";
// import cors from "cors";
import path from "path";
const __dirname = path.resolve();

const app = express();
app.use(express.json()); // body parser
// app.use(cors());

// app.get("/", (req, res) => {
//   console.log("Hello World!" + new Date());
//   res.send("Hello World!" + new Date());
// });

app.get("/profile", (req, res) => {
  console.log("This is profile!" + new Date());
  res.send("This is profile " + new Date());
});

app.get("/getHtmlFile", (req, res) => {
  // res.sendfile("./public/index.html");
  // res.sendfile("./public/image.jpg");
  res.sendfile("./public/vscode_windows.zip");
});

app.post("/weather", (req, res, next) => {
  console.log("req.body: ", req.body);

  // res.send("weather is normal"); // not recommended
  res.send({
    msg: "weather is normal",
    temp: 23,
    humidity: 10,
  });
});

app.use("/static", express.static(path.join(__dirname, "static")));
app.use(express.static(path.join(__dirname, "public")));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});

// Google cloud - Google Compute engine
// AWS - ES2 instance

// micro service architecture
// google app engine- cyclic - railway app - heroku - aws elastic beanstalk

// very cheap - per call charge - short lived
// nano service architecture
// google cloud functions - aws lambda functions - netlify functions

// GET     /api/v1/post/:userId/:postId
// GET     /api/v1/posts/:userId
// POST    /api/v1/post
// PUT     /api/v1/posts/:userId/:postId
// DELETE  /api/v1/post/:userId/:postId

// GET     /api/v2/post/:userId/:postId
// GET     /api/v2/posts/:userId
// POST    /api/v2/post
// PUT     /api/v2/posts/:userId/:postId
// DELETE  /api/v2/post/:userId/:postId

// GET     /v1/comment/:userId/:postId
// GET     /v1/comments/:userId
// POST    /v1/comment
// PUT     /v1/comment/:userId/:postId
// DELETE  /v1/comment/:userId/:postId

// POST /feed/:userId

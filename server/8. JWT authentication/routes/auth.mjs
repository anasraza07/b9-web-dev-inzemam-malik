import express from "express";
import { client } from "./../mongodb.mjs";
import { stringToHash, varifyHash } from "bcrypt-inzi";
import jwt from "jsonwebtoken"
const router = express.Router();

const userCollection = client.db("cruddb").collection("users");

router.post("/login", async (req, res) => {
  if (!req.body.email || !req.body.password) {
    res.status(403).send(`required paramters missing,
    example request body:
    {
      email: "some@email"
      password: "some$password"
    } `);
    return;
  }

  req.body.email = req.body.email.toLowerCase();
  // TODO: validate email


  try {
    let result = await userCollection.findOne({ email: req.body.email });
    console.log("result", result);

    // if user not found
    if (!result) {
      console.log("user not found")
      res.status(401).send({ msg: "email or password incorrect" });
      return;

      // if user found
    } else {

      const isMatch = await varifyHash(req.body.password, result.password)

      if (isMatch) {

        // const dateAfter24HrInMiliSec = (new Date().getTime() + (24 * 60 * 60 * 1000))
        const dateAfter2MinInMiliSec = (new Date().getTime() + (2 * 60 * 1000))

        // Creating Token
        const token = jwt.sign({
          firstName: result.firstName,
          email: req.body.email,
          isAdmin: false,
          // createdOn: new Date().getTime(),
          // expires: dateAfter24HrInMiliSec
          // expires: dateAfter2MinInMiliSec
        }, process.env.SECRET,{
            expiresIn: '24hr'
          }
        );

        // Sending Token In Cookies
        res.cookie("token", token, {
          httpOnly: true, // mandatory for security purpose 
          secure: true,
          expires: new Date(dateAfter2MinInMiliSec)
        })

        // TODO:  create token for this user
        res.send({ msg: "Login successfully" });
        return;
      } else {
        res.status(401).send({ msg: "email or password incorrect" });
        return;
      }
    }
  } catch (e) {
    console.log("error getting data in mongodb " + e);
    res.send("server error, please try again later");
  }
});

router.post("/signup", async (req, res) => {
  if (
    !req.body.firstName ||
    !req.body.lastName ||
    !req.body.email ||
    !req.body.password
  ) {
    res.status(403).send(`required paramteres missing,
    example request body:
    {
      firstName: "some firstName"
      lastName: "some lastName"
      email: "some@email"
      password: "some$password"
    } `);
    return;
  }
  req.body.email = req.body.email.toLowerCase();
  // TODO: validate email
  try {
    let result = await userCollection.findOne({ email: req.body.email });
    console.log("result", result);

    // if user not found
    if (!result) {
      const passwordHash = await stringToHash(req.body.password);
      try {
        const insertResponse = await userCollection.insertOne({
          firstName: req.body.firstName,
          lastName: req.body.lastName,
          email: req.body.email,
          password: passwordHash, // TODO: convert pass into hash
          createdOn: new Date(),
        });
        console.log("insertResponse", insertResponse);

        res.send({ message: "Signup successful" });
      } catch (err) {
        conosle.log("error inserting data mongodb  " + err);
        res.status(500).send("server error, please try again later!");
      }
      // if user already exist
    } else {
      res.status(403).send({ msg: "user already exist with this email" });
    }
  } catch (e) {
    console.log("error getting data in mongodb " + e);
    res.send("server error, please try again later");
  }
});

export default router;

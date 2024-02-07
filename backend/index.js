import cors from "cors";
import express from "express";
import { MongoClient } from "mongodb";
import dotenv from "dotenv";
dotenv.config();
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

const mongoClient = new MongoClient(process.env.MONGO_PATH);

app.get("/hej", (req, res) => {
  res.json("hejka");
});

app.get("/getusersinfo", async (req, res) => {
  const { mail } = req.query;
  console.log(mail);
  try {
    const downloads = await mongoClient
      .db(process.env.DB_NAME)
      .collection(process.env.DB_COLLECTION)
      .find({ user: mail })
      .toArray();
    downloads.sort(function (a, b) {
      return new Date(b.date) - new Date(a.date);
    });
    console.log(downloads);
    res.json(downloads);
  } catch (e) {
    console.log(e);
  }
});

app.get("/getusers", async (req, res) => {
  try {
    const users = await mongoClient
      .db(process.env.DB_NAME)
      .collection(process.env.DB_COLLECTION2)
      .find()
      .toArray();

    res.json(users);
  } catch (e) {
    console.log(e);
  }
});

app.post("/addlog", async (req, res) => {
  const { mail } = req.body;

  // console.log(req.body);
  console.log("log:" + mail);
  console.log("hello");

  try {
    const data = await mongoClient
      .db(process.env.DB_NAME)
      .collection(process.env.DB_COLLECTION2)
      .updateOne(
        { mail: mail },
        {
          $inc: { log: 1 },
        }
      );
    console.log(data);
    if (data != null) {
      res.json(true);
    } else {
      res.json(false);
    }
  } catch (e) {
    console.log(e);
  }
});

app.post("/addtic", async (req, res) => {
  const { mail, row, col, num, time } = req.body;

  try {
    const data = await mongoClient
      .db(process.env.DB_NAME)
      .collection(process.env.DB_COLLECTION2)
      .updateOne(
        { mail: mail },
        {
          $inc: { tic: 1 },
        }
      );
    console.log(data);
    if (data != null) {
      res.json(true);
    } else {
      res.json(false);
    }
  } catch (e) {
    console.log(e);
  }
  try {
    const data = await mongoClient
      .db(process.env.DB_NAME)
      .collection(process.env.DB_COLLECTION)
      .insertOne({
        user: mail,
        r: parseInt(row),
        c: parseInt(col),
        code: num,
        time: new Date(time),
      });

    console.log(data);
  } catch (e) {
    console.log(e);
  }
});

app.post("/person", async (req, res) => {
  console.log("works");
  const { user } = req.body;
  console.log(user);

  try {
    const data = await mongoClient
      .db(process.env.DB_NAME)
      .collection(process.env.DB_COLLECTION2)
      .findOne({ mail: user });

    console.log(data);
    if (data != null) {
      res.json(true);
    } else {
      res.json(false);
    }
  } catch (e) {
    console.log(e);
  }
});

const port = process.env.PORT;
app.listen(port, () => {
  console.log(`server is running on port ${process.env.PORT}!`);
});

// images.js

import clientPromise from "../../lib/mongodb";

export default async function handler(req, res) {
  const client = await clientPromise;
  const db = client.db("nextjs-mongodb-demo");
  switch (req.method) {
    case "POST":
        console.log(req.body);
      let bodyObject = req.body;
      let myPost = await db.collection("videos").insertOne(bodyObject);
      res.json(myPost.ops[0]);
      break;
    case "GET":
      const allimages = await db.collection("videos").find({}).toArray();
      res.json({ status: 200, data: allimages });
      break;
  }
}
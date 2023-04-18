// Get a list of 50 posts
router.get("/", async (req, res) => {
    let collection = await db.collection("posts");
    let results = await collection.find({})
      .limit(5)
      .toArray();
  
    res.send(results).status(200);
  });
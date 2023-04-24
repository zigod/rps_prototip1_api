// Get a list of 50 posts

router.get("/", async (req, res) => {
  console.log("its in");
    let collection = await db.collection("users");
    let results = await collection.find({})
      .limit(5)
      .toArray();
  
    res.send(results).status(200);
  });

// Get a single post
router.get("/:id", async (req, res) => {
  let collection = await db.collection("posts");
  let query = {_id: ObjectId(req.params.id)};
  let result = await collection.findOne(query);

  if (!result) res.send("Not found").status(404);
  else res.send(result).status(200);
});
const express = require("express");
const router = express.Router();
const Category = require("../models/productTest");
const getCategory = require("../middleware/protuctTest");
const authenticationToken = require("../middleware/authenticationToken");

// GET ALL CATEGORIES
// path: /categories
router.get("/", authenticationToken, async (req, res) => {
  try {
    const categories = await Category.find();
    res.json(categories);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET CATEGORY BY ID
// path: /categories/:1

router.get("/:id", authenticationToken, getCategory, async (req, res) => {
  res.send(res.category);
});

// ADD NEW CATEGORY
// path: /categories

router.post("/", authenticationToken, async (req, res) => {
  const category = new Category({
    categoryName: req.body.categoryName,
    description: req.body.description,
  });
  category
    .save()
    .then((data) => {
      res.json(data);
    })
    .catch((err) => res.json({ message: err }));
});

// BULK INSERT
router.post("/bulk-insert", authenticationToken, async (req, res) => {
  console.log(req.body.categories);
  const categories = req.body.categories.map((cat) => ({
    categoryName: cat.categoryName,
    description: cat.description,
  }));

  // Mongoose ile toplu ekleme işlemi
  Category.insertMany(categories)
    .then((data) => res.json(data))
    .catch((err) => res.status(400).json({ message: err }));
});

// UPDATE CATEGORY
// path: /categories/:id
router.patch("/:id", authenticationToken, getCategory, async (req, res) => {
  if (req.body.categoryName != null) {
    res.category.categoryName = req.body.categoryName;
  }
  if (req.body.description != null) {
    res.category.description = req.body.description;
  }
  try {
    const updatedCategory = await res.category.save();
    res.json(updatedCategory);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE CATEGORY
// path: /categories/:id
router.delete("/:id", authenticationToken, getCategory, async (req, res) => {
  try {
    await res.category.deleteOne();
    // res.json({ message: 'Category deleted' })
    // res.json(res.category);
    res.json(res.category._id);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;

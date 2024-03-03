const ProductTest = require("../models/productTest");

async function getProductTest(req, res, next) {
  let productTest;
  try {
    productTest = await ProductTest.findById(req.params.id);
    if (category == null) {
      return res
        .status(404) // not bulundu
        .json({ message: "Category not found" });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }

  res.productTest = productTest;
  next();
}

module.exports = getProductTest;
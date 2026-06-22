const express = require("express");
const router = express.Router();

const { getProducts } = require("../controllers/productController");
const { addProducts } = require("../controllers/updateController");

router.get("/", getProducts);
router.post("/add", addProducts);

module.exports = router;
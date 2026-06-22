require("dotenv").config();

const express = require("express");

const app = express();

app.use(express.json());

const productRoutes = require("./src/routes/productRoutes");

app.use("/products", productRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
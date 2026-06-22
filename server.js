require("dotenv").config();

const express = require("express");

const app = express();

app.use(express.json());

const productRoutes = require("./src/routes/productRoutes");

app.get("/check-env", (req, res) => {
  res.json({
    databaseExists: !!process.env.DATABASE_URL
  });
});

app.use("/products", productRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
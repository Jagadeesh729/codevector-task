const prisma = require("../utils/db");

exports.addProducts = async (req, res) => {
  const newProducts = [];

  for (let i = 0; i < 50; i++) {
    newProducts.push({
      name: `Live Product ${i}`,
      category: "electronics",
      price: Math.floor(Math.random() * 1000),
    });
  }

  await prisma.product.createMany({
    data: newProducts,
  });

  res.json({
    success: true,
    message: "50 new products inserted",
  });
};
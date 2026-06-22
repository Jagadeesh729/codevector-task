const prisma = require("../utils/db");

exports.getProducts = async (req, res) => {
  try {
    const { category, cursor, limit = 20 } = req.query;

    let where = {};

    if (category) {
      where.category = category;
    }

    if (cursor) {
      const decodedCursor = JSON.parse(
        Buffer.from(cursor, "base64").toString()
      );

      where.OR = [
        {
          updated_at: {
            lt: new Date(decodedCursor.updated_at),
          },
        },
        {
          updated_at: new Date(decodedCursor.updated_at),
          id: {
            lt: decodedCursor.id,
          },
        },
      ];
    }

    const products = await prisma.product.findMany({
      where,
      orderBy: [
        { updated_at: "desc" },
        { id: "desc" },
      ],
      take: parseInt(limit),
    });

    let nextCursor = null;

    if (products.length > 0) {
      const lastProduct = products[products.length - 1];

      nextCursor = Buffer.from(
        JSON.stringify({
          updated_at: lastProduct.updated_at,
          id: lastProduct.id,
        })
      ).toString("base64");
    }

    res.json({
      success: true,
      count: products.length,
      nextCursor,
      products,
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
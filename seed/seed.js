const prisma = require("../src/utils/db");
const { faker } = require("@faker-js/faker");

const categories = ["electronics", "books", "fashion", "sports"];

async function main() {
  const batchSize = 5000;
  const total = 200000;

  for (let i = 0; i < total; i += batchSize) {
    const products = Array.from({ length: batchSize }, () => ({
      name: faker.commerce.productName(),
      category: categories[Math.floor(Math.random() * categories.length)],
      price: parseFloat(faker.commerce.price())
    }));

    await prisma.product.createMany({
      data: products
    });

    console.log(`Inserted ${i + batchSize}`);
  }
}

main()
  .catch(console.error)
  .finally(async () => {
    await prisma.$disconnect();
  });
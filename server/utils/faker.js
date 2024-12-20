import { PrismaClient } from "@prisma/client";
import { faker } from "@faker-js/faker";

const prisma = new PrismaClient();

async function seed() {
  // Create random users
  const users = [];
  for (let i = 0; i < 5; i++) {
    users.push(
      await prisma.user.create({
        data: {
          name: faker.person.fullName(),
          username: faker.internet.username(),
          email: faker.internet.email(),
          password: faker.internet.password(),
          phoneNumber: faker.phone.number(),
          profileImage: faker.image.url(), // Corrected function
        },
      })
    );
  }

  // Create categories
  const categories = [];
  for (let i = 0; i < 3; i++) {
    categories.push(
      await prisma.category.create({
        data: {
          name: faker.commerce.department(),
        },
      })
    );
  }

  // Create products
  const products = [];
  for (let i = 0; i < 10; i++) {
    products.push(
      await prisma.product.create({
        data: {
          name: faker.commerce.productName(),
          description: faker.commerce.productDescription(),
          imageUrl: faker.image.url(), // Corrected function
          categoryId:
            categories[Math.floor(Math.random() * categories.length)].id,
        },
      })
    );
  }

  // Create product variants
  const productVariants = [];
  for (const product of products) {
    for (let i = 0; i < 3; i++) {
      productVariants.push(
        await prisma.productVariant.create({
          data: {
            productId: product.id,
            sku: faker.string.uuid(),
            price: parseFloat(faker.commerce.price()),
            stock: faker.number.int({ min: 1, max: 100 }), // Corrected function
          },
        })
      );
    }
  }

  // Create orders
  for (const user of users) {
    const order = await prisma.order.create({
      data: {
        userId: user.id,
        status: "PENDING",
        totalAmount: faker.number.float({ min: 20, max: 500, precision: 0.01 }), // Corrected function
      },
    });

    // Add order items
    for (let i = 0; i < 3; i++) {
      await prisma.orderItem.create({
        data: {
          orderId: order.id,
          productId: products[Math.floor(Math.random() * products.length)].id,
          quantity: faker.number.int({ min: 1, max: 5 }), // Corrected function
          price: parseFloat(faker.commerce.price()),
        },
      });
    }
  }

  console.log("Seeding completed!");
}

seed()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

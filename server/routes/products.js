import express from "express";
import prisma from "../utils/prismaClient.js";
const router = express.Router();

router.get("/", async (req, res) => {
  // get all the products
  try {
    const products = await prisma.product.findMany();

    return res.json({ products });
  } catch (err) {
    return res.json({ message: "db error", err });
  }
});

router.get("/:productId", async (req, res) => {
  try {
    const { productId } = req.params;

    const product = await prisma.product.findUnique({
      where: {
        id: parseInt(productId),
      },
    });

    return res.json({ product });
  } catch (err) {
    return res.json(err);
  }
});

export default router;

import express from "express";
import prisma from "../utils/prismaClient.js";
const router = express.Router();

router.get("/", async (req, res) => {
  // get all the categories
  try {
    const categories = await prisma.category.findMany();

    return res.json({ categories });
  } catch (err) {
    return res.json({ message: "db error", err });
  }
});

router.get("/:categoryId", async (req, res) => {
  try {
    const { categoryId } = req.params;

    const category = await prisma.category.findUnique({
      where: {
        id: parseInt(categoryId),
      },
    });

    console.log(category);
    return res.json({ category });
  } catch (err) {
    return res.json(err);
  }
});

export default router;

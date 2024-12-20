import express from "express";
import categoriesRouter from "./categories.js";
import productsRouter from "./products.js";
import authRouter from "./auth.js";
const router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
  res.send("Hello World");
});

router.use("/categories", categoriesRouter);
router.use("/products", productsRouter);
router.use("/auth", authRouter);

export default router;

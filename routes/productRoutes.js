import express from "express";
import {
  createProduct,
  updateProduct,
  deleteProduct,
  getProducts,
} from "../controllers/productController.js";

const router = express.Router();

// Route to create a new product

router.post("/add", createProduct);

// Route to get all product
router.get("/", getProducts);

// Route to update a product by ID
router.put("/update/:id", updateProduct);

// Route to delete a product by ID
router.delete("/delete/:id", deleteProduct);

export default router;

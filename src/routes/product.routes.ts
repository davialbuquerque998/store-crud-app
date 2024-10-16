import { Router } from "express";
import { createProduct, getProducts, getProduct, deleteProduct, updateProduct } from "../controllers/product.controller";

const router:Router = Router();

router.post("/", createProduct);
router.get("/", getProducts);
router.get("/:id", getProduct);
router.put("/:id", updateProduct);
router.delete("/:id", deleteProduct);

export default router;
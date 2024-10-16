import express from "express";
import cors from "cors";
import productRoutes from "./routes/product.routes";
import morgan from "morgan";

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/products", productRoutes);
app.use(morgan("tiny"));

export default app;



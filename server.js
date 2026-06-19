import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import cartRoutes from "./routes/cart.js";
import addressRoutes from "./routes/address.js";
import orderRoutes from "./routes/order.js";
//import { getProducts } from "./controllers/productController.js";
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/address", addressRoutes);
app.use("/api/order", orderRoutes);

let isConnected = false;

async function connectToMongoDB() {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    isConnected = true;
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
}

// add middleware

app.use((req, res, next) => {
  if (!isConnected) {
    connectToMongoDB();
  }
  next();
});

module.exports = app;

// app.get("/", (req, res) => {
//   res.send("API is Running... 5001");
// });
// const PORT = process.env.PORT || 5001;
// connectDB();

// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });

// app.listen(5001, () => {
//   console.log("Server is running on Port 5001");
// });

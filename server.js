import express from "express";
import colors from "colors";
import dotenv from "dotenv";
import morgan from "morgan";
import connectDB from "./config/db.js";
import authoRoutes from "./routes/authRoute.js";
import cors from "cors";
import categoryRoutes from "./routes/categoryRoutes.js"

//env
dotenv.config();

// Express app
const app = express();
//db config
connectDB();

//middleWare
app.use(express.json());
app.use(morgan("dev"));
app.use(cors());
// Route
app.use("/api/v1/auth", authoRoutes);
app.use("/api/v1/category", categoryRoutes)
app.get("/", (req, res) => {
  res.send("<h1>Welcome to Saman</h1>");
});

// Default port
const PORT = process.env.PORT;
// Starting server
app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`.bgCyan.white);
});

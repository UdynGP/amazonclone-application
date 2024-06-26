const express = require("express");
const morgan = require("morgan");
const connectDB = require("./config/db");
const dotenv = require("dotenv");
const authRoute = require("./routes/authRoute");
const categoriesRoute = require("./routes/categoriesRoute");
const subcategoriesRoute = require("./routes/subcategoriesRoute");
const productsRoute = require("./routes/productsRoute");
const ordersRoute = require("./routes/ordersRoute");
const cors = require("cors");
const path = require("path");

// REST object
const app = express();

// Configure env
dotenv.config();

// Connect to Database
connectDB();

// PORT
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(morgan("dev"));
app.use(cors());
app.use(express.static(path.join(__dirname, "../frontend/build")));

// Routes
app.use("/api/auth", authRoute);
app.use("/api/categories", categoriesRoute);
app.use("/api/subcategories", subcategoriesRoute);
app.use("/api/products", productsRoute);
app.use("/api/orders", ordersRoute);

// GET Response from server
/*
app.get("/", (req, res) => {
  res.send({
    message: "Welcome to Amazon.com Backend API",
  });
});*/

// CREATE REST API
app.use("*", function (req, res) {
  res.sendFile(path.join(__dirname, "../frontend/build/index.html"));
});

// Listen
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT} in ${process.env.MODE} mode`);
});

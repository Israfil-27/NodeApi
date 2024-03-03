const express = require("express");
const { default: mongoose } = require("mongoose");
const cors = require("cors");
// const mongoose = require('mongoose');  // mongoşu bağlamak için
require("dotenv").config(); // .env dosyasını okumak için

const app = express();
app.use(cors());
app.use(express.json()); // expressin json veri almasını sağlar

mongoose
  .connect(process.env.DATABASE_SERVER_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to the database!");
  })
  .catch((err) => {
    console.log("Connection failed!", err);
  });

const authRouter = require("./routes/auth");
const roleRouter = require("./routes/roles");
const uploadRouter = require("./routes/uploads");
const productsRouter = require("./routes/products");
const userRoleRouter = require("./routes/userRoles");
const categoriesRouter = require("./routes/categories");
const permissionRouter = require("./routes/permissions");
const ProductsTests = require("./routes/productsTests");

app.use("/api/auth", authRouter);
app.use("/api/roles", roleRouter);
app.use("/api/uploads", uploadRouter);
app.use("/api/products", productsRouter);
app.use("/api/userRoles", userRoleRouter);
app.use("/api/categories", categoriesRouter);
app.use("/api/permissions", permissionRouter);
app.use("/api/productsTests", ProductsTests);

const PORT = process.env.PORT || 5001; // .env dosyasında PORT yoksa 5001 portunu kullanır
app.listen(PORT, () => console.log(`server running on port ${PORT}`));

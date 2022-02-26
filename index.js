const express = require("express");
const app = express();
const path = require("path");
const mongoose = require("mongoose");
require ("dotenv").config();
const methodOverride = require("method-override");
app.use(methodOverride("_method"));
//Product model
const Product = require("./models/product");
app.use(express.urlencoded({ extended: true }));

console.log(process.env.MONGO_URI);

const categories = ["vegetable", "fruit", "dairy", "baked product"];
//Connecting to mongo
mongoose
  .connect(
    "mongodb+srv://m001-student:m001-mongodb-basics@sandbox.mxzab.mongodb.net/myShop?retryWrites=true&w=majority"
  )
  .then(() => {
    console.log("Connection to mongo established");
  })
  .catch((err) => {
    console.log("Got an Error");
    console.log(err);
  });

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

//to avoid long waits of find query use async
app.get("/products", async (req, res) => {
  const products = await Product.find({});
  res.render("products/index", { products });
});
//Question: why if it is written before /id gives error
app.get("/products/new", (req, res) => {
  res.render("products/newProduct", { categories });
});

app.post("/products", async (req, res) => {
  const newProduct = new Product(req.body);
  console.log(newProduct);
  await newProduct.save();
  res.redirect("/products");
});

app.get("/products/:id", async (req, res) => {
  const { id } = req.params;
  const productById = await Product.findById(id);
  console.log(productById);
  res.render("products/productById", { productById });
});

app.get("/products/:id/edit", async (req, res) => {
  const { id } = req.params;
  const product = await Product.findById(id);
  res.render("products/editProduct", { product });
});

app.put("/products/:id", async (req, res) => {
  const { id } = req.params;
  const product = await Product.findByIdAndUpdate(id, req.body, {
    runValidators: true,
    new: true,
  });
  res.redirect(`/products/${id}`);
});

app.listen(8080, () => {
  console.log("I am listning");
});

/* For local DB connection .connect("mongodb://localhost:27017/myShop", { useNewUrlParser: true }) */

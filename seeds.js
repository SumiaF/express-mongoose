const Product = require("./models/product");
const mongoose = require("mongoose");

//Connecting to mongo
mongoose
  .connect("mongodb+srv://m001-student:m001-mongodb-basics@sandbox.mxzab.mongodb.net/myShop?retryWrites=true&w=majority", { useNewUrlParser: true })
  .then(() => {
    console.log("Connection to mongo established");
  })
  .catch((err) => {
    console.log("Got an Error");
    console.log(err);
  });
//For adding data to the database
/* const p = new Product({
  name: "Chedder",
  price: 2.99,
  category: "dairy"
});

p.save()
  .then((p) => {
    console.log(p);
  })
  .then((e) => {
    console.log(e);
  });
 */

const productsArray = [
  {
    name: "Milk",
    price: 3.99,
    category: "dairy",
  },
  {
    name: "Strawberries",
    price: 4.99,
    category: "fruit",
  },
  {
    name: "blueberries",
    price: 4.0,
    category: "fruit",
  },
  {
    name: "Potatos",
    price: 2.0,
    category: "vegetable",
  },
];

Product.insertMany(productsArray)
  .then((res) => {
    console.log(res);
  })
  .catch((err) => console.log(err));

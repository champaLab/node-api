const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());

let products = [
  { id: 1, name: "Product 1", price: 100 },
  { id: 2, name: "Product 2", price: 200 },
];

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.get("/v1/products", (req, res) => {
  res.json(products);
});

app.get("/v1/products/:id", (req, res) => {
  const product = products.find((p) => p.id === parseInt(req.params.id));
  if (product) {
    res.json(product);
  } else {
    res.status(404).json({ message: "Product not found" });
  }
});

app.post("/v1/products", (req, res) => {
  const newProduct = { id: products.length + 1, ...req.body };
  products.push(newProduct);
  res.status(201).json(newProduct);
});

app.put("/v1/products/:id", (req, res) => {
  const productIndex = products.findIndex(
    (p) => p.id === parseInt(req.params.id)
  );
  if (productIndex !== -1) {
    products[productIndex] = { id: parseInt(req.params.id), ...req.body };
    res.json(products[productIndex]);
  } else {
    res.status(404).json({ message: "Product not found" });
  }
});

app.delete("/v1/products/:id", (req, res) => {
  const productIndex = products.findIndex(
    (p) => p.id === parseInt(req.params.id)
  );
  if (productIndex !== -1) {
    const deletedProduct = products.splice(productIndex, 1);
    res.json(deletedProduct);
  } else {
    res.status(404).json({ message: "Product not found" });
  }
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

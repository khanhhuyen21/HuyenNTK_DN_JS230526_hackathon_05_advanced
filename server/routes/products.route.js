const express = require("express");
const productRoute = express.Router();
const path = require("path");
const fs = require("fs");

const productPath = path.join(__dirname, "../data/products.json");
// get all products
productRoute.get("/", (req, res) => {
  fs.readFile(productPath, "utf8", (err, data) => {
    if (err) {
      res.write(err);
      res.status(400).send("Invalid");
      return;
    }
    const productData = JSON.parse(data);
    res.status(200).json(productData);
  });
});

// get one product
productRoute.get("/:id", (req, res) => {
  fs.readFile(productPath, "utf8", (err, data) => {
    if (err) {
      console.error(err);
      res.status(400).send("Invalid");
      return;
    }
    const productData = JSON.parse(data);
    const product = productData.find((item) => item.id == req.params.id);
    res.status(200).json(product);
  });
});

// create product
productRoute.post("/create", (req, res) => {
  fs.readFile(productPath, (err, data) => {
    if (err) {
      console.error(err);
      res.status(400).send("Invalid");
      return;
    }
    const producData = JSON.parse(data);
    const newProduct = {
      userId: req.body.userId,
      id: postData[postData.length - 1].id + 1,
      title: req.body.title,
      body: req.body.body,
    };
    console.log(newProduct);
    const product = producData.find((item) => item.id == newProduct.id);
    if (!product) {
      postData.push(newProduct);
      fs.writeFile(productPath, JSON.stringify(producData), "utf8", (err) => {
        if (err) {
          console.error(err);
          res.status(400).send("Invalid");
          return;
        }
        res.status(200).json({ message: "Create successfully" });
        return;
      });
    }
  });
});

// update product
productRoute.put("/:id", (req, res) => {
  fs.readFile(productPath, (err, data) => {
    if (err) {
      console.error(err);
      res.status(400).send("Invalid");
      return;
    }
    const productData = JSON.parse(data);
    const indexProduct = productData.findIndex(
      (item) => item.id == req.params.id
    );
    if (productData == -1) {
      res.status(404).send("Post not found");
      return;
    }
    productData[indexProduct] = { ...productData[indexProduct], ...req.body };
    fs.writeFile(productPath, JSON.stringify(productData), "utf8", (err) => {
      if (err) {
        console.error(err);
        res.status(400).send("Invalid");
        return;
      }
      res.status(200).json(productData);
    });
  });
});

//delete product
productRoute.delete("/:id", (req, res) => {
  fs.readFile(productPath, "utf8", (err, data) => {
    if (err) {
      console.error(err);
      res.status(400).send("Invalid");
    }
    const productData = JSON.parse(data);
    const newData = productData.filter((item) => item.id != req.params.id);
    fs.writeFile(productPath, JSON.stringify(newData), "utf8", (err) => {
      if (err) {
        console.error(err);
        res.status(400).send("Invalid");
        return;
      }
      res.status(200).json(newData);
    });
  });
});

productRoute.patch("/:receiptId/products/:productId", (req, res) => {
  const receiptId = parseInt(req.params.receiptId);
  const productId = parseInt(req.params.productId);
  const updatedQuantity = req.body.quantity;
  const receipt = receipt.find((r) => r.id === receiptId);
  if (!receipt) {
    res.status(404).json({ message: "Receipt not found" });
    return;
  }
  const product = product.find((p) => p.id === productId);

  if (!product) {
    res.status(404).json({ message: "Product not found" });
    return;
  }
  receipt.products[productId] = updatedQuantity;
  res.status(200).json(receipt);
});

module.exports = productRoute;

const express = require("express");
const receiptRoute = express.Router();
const path = require("path");
const fs = require("fs");

const receiptPath = path.join(__dirname, "../data/receipts.json");

receiptRoute.get("/", (req, res) => {
  fs.readFile(receiptPath, "utf8", (err, data) => {
    if (err) {
      res.write(err);
      res.status(400).send("Invalid");
      return;
    }
    const receiptData = JSON.parse(data);
    res.status(200).json(receiptData);
  });
});

// Tạo route để cập nhật số lượng sản phẩm trong biên nhận
receiptRoute.patch("/:id/products/:productId", (req, res) => {
  const receiptId = parseInt(req.params.id);
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

module.exports = receiptRoute;

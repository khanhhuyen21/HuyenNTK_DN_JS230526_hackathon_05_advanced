require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const productRoute = require("./routes/products.route");
const receiptRoute = require("./routes/receipts.route");
const app = express();
const cors = require("cors");
const port = process.env.SERVER_PORT || 5000;
app.use(bodyParser.json());
app.use(cors());
app.use("/api/v1/products", productRoute);
app.use("/api/v1/receipts", receiptRoute);

app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}/ `);
});

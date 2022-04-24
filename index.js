const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const userRoutes = require("./routes/user")
const authRoute = require("./routes/auth")
const productRoute = require("./routes/Product")
const cartRoute = require("./routes/cart")
const orderRoute = require("./routes/order")
const cors = require("cors")
dotenv.config();

mongoose
  .connect(
    "mongodb+srv://singh202:Anurag1234@cluster0.bxefk.mongodb.net/ecommerce"
  )
  .then(() => console.log("connected"))
  .catch((err) => console.log(err));

  app.use(cors());
  app.use(express.json())
  app.use("/api/user", userRoutes)
  app.use("/api/auth", authRoute)
  app.use("/api/products", productRoute);
  app.use("/api/order", orderRoute)
  app.use("/api/cart/", cartRoute)

app.listen(process.env.PORT || 5000, () => {
  console.log("server is running on port 5000");
});

const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const userRoutes = require("./routes/user");
const authRoute = require("./routes/auth");
const productRoute = require("./routes/Product");
const cartRoute = require("./routes/cart");
const orderRoute = require("./routes/order");
const todoRoutes = require("./routes/todo");
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./swagger");

const cors = require("cors");
dotenv.config();

mongoose
  .connect(
    "mongodb+srv://singh202:Anurag1234@cluster0.bxefk.mongodb.net/ecommerce",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => console.log("connected"))
  .catch((err) => console.log(err));

app.use(cors());
app.use(express.json());
app.use("/api/user", userRoutes);
app.use("/api/auth", authRoute);
app.use("/api/products", productRoute);
app.use("/api/order", orderRoute);
app.use("/api/cart", cartRoute);
app.use("/api/todo", todoRoutes);

// app.use('/ ', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Create a route that serves the Swagger UI documentation.
// app.use('/documentation', swaggerUiExpress.serve(apiDocumentation));

app.listen(process.env.PORT || 5500, () => {
  console.log(`server is running on port ${process.env.PORT || 5500}`);
});

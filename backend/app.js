const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const router = require("./src/routers/router");
const swaggerUi = require("swagger-ui-express");
const yaml = require("yamljs");
const app = express();
const cors = require("cors");

dotenv.config();
app.use(express.json());
app.use(cors({ origin: "*" }));

mongoose
  .connect(process.env.mongoURl)
  .then(() => console.log("connected to database"))
  .catch((error) => {
    console.log("could not connect to database");
    console.log(process.env.mongoURl);
    console.log(error);
  });

const specs = yaml.load("./swagger.yml");
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));

app.use("/", router);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});

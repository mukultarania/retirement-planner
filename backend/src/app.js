const express = require("express");
const cors = require("cors");
const routes = require("./routes/transaction.routes");
const { errorHandler } = require("./middlewares/error.middleware");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/blackrock/challenge/v1", routes);

app.use(errorHandler);

module.exports = app;
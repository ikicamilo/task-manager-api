require("./db/connect");
require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const tasks = require("./routes/tasks");
const connectDB = require("./db/connect");
const path = require("path");
const notFound = require("./middleware/not-found");
const errorHandlerMiddleware = require("./middleware/error-handler");

// Swagger
const SwaggerUI = require("swagger-ui-express");
const YAML = require("yamljs");
const SwaggerDocument = YAML.load("./swagger.yaml");

// middleware
app.use(express.static(path.resolve(__dirname, "./public")));
app.use(express.json());
app.use(cors());

// routes
app.get("/hello", (req, res) => {
  res.send("Task Manager App");
});

app.use("/api/v1/tasks", tasks);
app.use("/api-docs", SwaggerUI.serve, SwaggerUI.setup(SwaggerDocument));
app.use(notFound);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 3000;

const start = async () => {
  try {
    await connectDB(process.env.MONGODB_URI_03);
    app.listen(port, console.log(`Server is listenin on port ${port}`));
  } catch (error) {
    console.log(error);
  }
};

start();

const express = require("express");
const app = express();
const { colors } = require("./helpers");
const connectDb = require("./config/db");
require("dotenv").config({ path: "./config/.env" });
app.use(express.json());
const { booksRouter } = require("./routes");

app.use("/api/v1/books", booksRouter);

connectDb();

const { PORT = 5050 } = process.env;
const server = app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`.green);
});

process.on("unhandledRejection", (error, _) => {
  console.log(`Error: ${error.message}`.red);
  server.close(() => {
    return process.exit(1);
  });
});

app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

app.use((err, req, res, next) => {
  res.status(500).json({ message: err.message });
});

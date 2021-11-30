const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();
const { readdirSync } = require("fs");

// import router
// const authRoutes = require("./routes/auth");
// const personRoutes = require("./routes/person");

// app
const app = express();

app.use(express.static(__dirname + "/public"));

// connect DB
mongoose
  .connect("mongodb://localhost:27017/db_test")
  .then(() => console.log("DB connectes"))
  .catch((err) => console.log("db connect", err));

// middleware
app.use(morgan("dev"));
app.use(bodyParser.json({ limit: "2mb" }));
app.use(cors());

// routes
// app.use("/api", authRoutes);
// app.use("/api", personRoutes);
readdirSync("./routes").map((r) => app.use("/api", require("./routes/" + r)));

const port = process.env.PORT || 5000;
app.listen(port, () => console.log("server is running on port ", port));

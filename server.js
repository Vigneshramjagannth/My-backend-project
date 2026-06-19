const express = require("express");
const mongoose = require("mongoose");

const expenseRoutes = require("./routes/expenseRoutes");

const app = express();

app.use(express.json());

app.use("/expenses", expenseRoutes);

mongoose.connect("mongodb://127.0.0.1:27017/expenseTracker")
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

app.get("/", (req, res) => {
  res.send("Expense Tracker API Running");
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});
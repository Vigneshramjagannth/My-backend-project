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
//expenserouter.js
const express = require("express");
const router = express.Router();

const Expense = require("../models/Expense");

// Create Expense
router.post("/", async (req, res) => {
  try {
    const expense = await Expense.create(req.body);

    res.status(201).json(expense);
  } catch (error) {
    res.status(500).json(error);
  }
});

// Get All Expenses
router.get("/", async (req, res) => {
  try {
    const expenses = await Expense.find();

    res.json(expenses);
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
//expense.js
const mongoose = require("mongoose");

const expenseSchema = new mongoose.Schema({
  Expense_name: {
    type: String,
    required: true
  },

  amount: {
    type: Number,
    required: true
  },

  Purpose: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model("Expense", expenseSchema);

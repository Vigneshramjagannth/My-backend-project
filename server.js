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

// CREATE Expense
router.post("/", async (req, res) => {
  try {
    const expense = await Expense.create(req.body);
    res.status(201).json(expense);
  } catch (error) {
    res.status(500).json(error);
  }
});

// GET All Expenses
router.get("/", async (req, res) => {
  try {
    const expenses = await Expense.find();
    res.json(expenses);
  } catch (error) {
    res.status(500).json(error);
  }
});

// GET Single Expense
router.get("/:id", async (req, res) => {
  try {
    const expense = await Expense.findById(req.params.id);

    if (!expense) {
      return res.status(404).json({
        message: "Expense not found"
      });
    }

    res.json(expense);
  } catch (error) {
    res.status(500).json(error);
  }
});

// UPDATE Expense
router.put("/:id", async (req, res) => {
  try {
    const updatedExpense = await Expense.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!updatedExpense) {
      return res.status(404).json({
        message: "Expense not found"
      });
    }

    res.json(updatedExpense);
  } catch (error) {
    res.status(500).json(error);
  }
});

// DELETE Expense
router.delete("/:id", async (req, res) => {
  try {
    const deletedExpense = await Expense.findByIdAndDelete(req.params.id);

    if (!deletedExpense) {
      return res.status(404).json({
        message: "Expense not found"
      });
    }

    res.json({
      message: "Expense deleted successfully"
    });
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

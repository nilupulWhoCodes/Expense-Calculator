import express from "express";
import cors from "cors";
import mongoose from "mongoose";

const getDate = () => {
  const date = new Date();
  let currentYear = date.getFullYear();

  return { date: date, currentYear: currentYear };
};

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect("mongodb://localhost:27017/expenses", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const expenseSchema = new mongoose.Schema({
  category: String,
  subcategory: String,
  month: String,
  date: Date,
  year: Number,
  amount: Number,
});

const Expense = mongoose.model("Expense", expenseSchema);

app.get("/expenses", async (req, res) => {
  try {
    const { month } = req.query;
    const expenses = await Expense.aggregate([
      {
        $match: {
          month: month
        }
      },
      {
        $group: {
          _id: { category: "$category" },
          totalAmount: { $sum: "$amount" },
          subexpenses: { 
            $push: { 
              subcategory: "$subcategory", 
              amount: "$amount" 
            } 
          } 
        }
      },
      {
        $project: {
          _id: 0,
          category: "$_id.category",
          totalAmount: 1,
          subexpenses: 1
        }
      }
    ]);
    res.json(expenses);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error", errorDes: error });
  }
});



app.get("/expenses-category", async (req, res) => {
  const { year } = req.query;
  try {
    const expensesCat = await Expense.aggregate([
      {
        $match: { year: parseInt(year) } // Filter documents by year
      },
      {
        $group: {
          _id: { category: "$category", month: "$month" }, // Group by category and month
          totalAmount: { $sum: "$amount" }
        }
      },
      {
        $group: {
          _id: "$_id.month", // Group by month only
          data: { $push: { category: "$_id.category", totalAmount: "$totalAmount" } }
        }
      },
      {
        $project: {
          _id: 0,
          month: "$_id", // Rename _id to month
          data: 1
        }
      }
    ]);
    res.json(expensesCat);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error", errorDes: error });
  }
});

app.get("/expenses-sub-cat", async (req, res) => {

  const { month } = req.query;
  const { category } = req.query;

  try {
    const subExpenses = await Expense.aggregate([
      {
        $match: {
          month: month,
          category: category
        }
      }, {
        $project: {
          "subcategory": 1,
        }
      }

    ]);
    res.json(subExpenses);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error", errorDes: error });
  }
});

app.post("/add-expense", async (req, res) => {
  try {
    const payload = req.body;
    const month = payload.month;
    const category = payload.category;
    const expenses = payload.expenses;
    const expensesEntries = Object.entries(expenses);

    const dateInfo = getDate();

    let date = dateInfo.date;
    let year = parseInt(dateInfo.currentYear);

    const mappedExpenses = expensesEntries.map(async ([subcategory, amount]) => {
      const expense = new Expense({
        category: category,
        subcategory: subcategory,
        month: month,
        date: date,
        year: year,
        amount: parseInt(amount),
      });
      await expense.save();
      return expense;
    });

    res.status(200).json({ success: true });
  } catch (error) {
    res.status(500).json({ success: false, errorDescription: error });
  }
});

app.listen(8800, () => {
  console.log("Connected to backend");
});

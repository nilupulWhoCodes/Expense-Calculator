import OracleDB from "oracledb";
import express from "express";
import cors from "cors";

const getDate = () => {
  const date = new Date();
  let currentYear = date.getFullYear();

  return { date: date, currentYear: currentYear };
};

const app = express();
OracleDB.outFormat = OracleDB.OUT_FORMAT_OBJECT;

async function con() {
  let con;

  try {
    con = await OracleDB.getConnection({
      user: "C##Niluwa",
      password: "Oracle123",
      connectionString: "localhost/orcl",
    });

    app.use(express.json());
    app.use(cors());

    app.get("/expenses", async (req, res) => {
      try {
        const { month } = req.query;
        const sql = "SELECT * FROM tbl_expenses where VMONTH = :month";
        const result = await con.execute(sql, [month]);

        res.json(result.rows);
      } catch (error) {
        res
          .status(500)
          .json({ error: "Internal Server Error", errorDes: error });
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

        const mappedExpenses = expensesEntries.map(
          async ([subcategory, amount]) => {
            const sql =
              "INSERT INTO tbl_expenses(iid,vexpensetype,VEXPENSESUBTYPE,vmonth,ddate,iyear,iamount) VALUES (SEQ_EXPENSE.NEXTVAL, :vtype, :subtype, :vmonth, :ddate ,:year ,:amount)";

            const values = [
              category,
              subcategory,
              month,
              date,
              year,
              parseInt(amount),
            ];
            const result = await con.execute(sql, values, { autoCommit: true });

            return result;
          }
        );

        res.status(200).json({
          success: true,
        });
      } catch (error) {
        res.status(500).json({
          success: false,
          errorDescription: error,
        });
      }
    });

    app.listen(8800, () => {
      console.log("Connected to backend");
    });
  } catch (error) {
    console.log(error);
  }
}
con();

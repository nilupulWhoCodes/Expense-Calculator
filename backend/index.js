import OracleDB from "oracledb";
import express from "express";
import cors from 'cors';

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

        console.log(result.rows);
      } catch (error) {
        res
          .status(500)
          .json({ error: "Internal Server Error", errorDes: error });
      }
    });

    // app.post("/add-expense", async (req, res) => {
    //   try {
    //     const sql =
    //       "INSERT INTO tbl_expenses(iid,vexpensetype,vmonth,ddate,iamount)values(:iid,:vtype,:vmonth,:ddate,:amount)";
    //     const values = [2, "title", "25-NOV-23"];

    //     const result = await con.execute(sql, values, { autoCommit: true });

    //     res.json({ success: true, insertedRows: result.rowsAffected });
    //   } catch (error) {
    //     console.log(error);
    //     res
    //       .status(500)
    //       .json({ error: "Internal Server Error", errorDes: error });
    //   }
    // });

    app.listen(8800, () => {
      console.log("Connected to backend");
    });
  } catch (error) {
    console.log(error);
  }
}
con();

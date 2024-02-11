import Box from "@mui/material/Box";
import Header from "./Header";
import AddExpense from "./AddExpense";
import MonthBar from "./MonthBar";
import { useState, useEffect } from "react";
import axios from "axios";
import ShowExpenses from "./ShowExpenses";

interface Expenses {
  IID: number;
  VEXPENSETYPE: string;
  DDATE: Date;
  VMONTH: string;
  IAMOUNT: number;
}

function Expenses() {
  const date = new Date();
  let nowCurrentMonth = date.getMonth();

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const [currentMonth, setCurrentMonth] = useState(nowCurrentMonth);
  let monthName = months[currentMonth];

  const [selectedMonth, setSelectedMonth] = useState<string>(monthName);
  const [expenses, setExpenses] = useState<Expenses[]>([]);

  const getData = async (selectedMonth: string) => {
    try {
      const res = await axios.get(
        `http://localhost:8800/expenses?month=${selectedMonth}`
      );
      setExpenses(res.data);

      console.log(res);
    } catch (error) {
      <console className="error"></console>(error);
    }
  };

  const handleMonthClick = (index: number) => {
    setCurrentMonth(index);
    const selectedMonthName = months[index];
    setSelectedMonth(selectedMonthName);
  };

  useEffect(() => {
    getData(selectedMonth);
  }, [selectedMonth]);

  return (
    <Box>
      <Header></Header>
      <AddExpense
        months={months}
        currentMonth={currentMonth}
        monthName={monthName}
      ></AddExpense>
      <MonthBar
        months={months}
        currentMonth={currentMonth}
        onMonthClick={handleMonthClick}
      ></MonthBar>
      <ShowExpenses expenseData={expenses}></ShowExpenses>
    </Box>
  );
}

export default Expenses;

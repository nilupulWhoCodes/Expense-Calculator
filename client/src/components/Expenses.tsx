import Box from "@mui/material/Box";
import Header from "./Header";
import AddExpense from "./AddExpenseButton";
import MonthBar from "./MonthBar";
import { useState, useEffect } from "react";
import axios from "axios";
import ShowExpenses from "./ShowExpenses";
import { Stack } from "@mui/material";
import { BarChart } from "@mui/x-charts/BarChart";
import { axisClasses } from "@mui/x-charts";
import * as React from "react";

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
      console.error(error);
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

  const dataset = [
    {
      london: 59,
      paris: 57,
      newYork: 86,
      seoul: 21,
      month: "Jan",
    },
    {
      london: 50,
      paris: 52,
      newYork: 78,
      seoul: 28,
      month: "Fev",
    },
    {
      london: 47,
      paris: 53,
      newYork: 106,
      seoul: 41,
      month: "Mar",
    },
    {
      london: 54,
      paris: 56,
      newYork: 92,
      seoul: 73,
      month: "Apr",
    },
    {
      london: 57,
      paris: 69,
      newYork: 92,
      seoul: 99,
      month: "May",
    },
    {
      london: 60,
      paris: 63,
      newYork: 103,
      seoul: 144,
      month: "June",
    },
    {
      london: 59,
      paris: 60,
      newYork: 105,
      seoul: 319,
      month: "July",
    },
    {
      london: 65,
      paris: 60,
      newYork: 106,
      seoul: 249,
      month: "Aug",
    },
    {
      london: 51,
      paris: 51,
      newYork: 95,
      seoul: 131,
      month: "Sept",
    },
    {
      london: 60,
      paris: 65,
      newYork: 97,
      seoul: 55,
      month: "Oct",
    },
    {
      london: 1000,
      paris: 64,
      newYork: 76,
      seoul: 48,
      month: "Nov",
    },
    {
      london: 61,
      paris: 70,
      newYork: 103,
      seoul: 25,
      month: "Dec",
    },
  ];

  const valueFormatter = (value: number) => `${value}mm`;

  const chartSetting = {
    width: 600,
    height: 300,
    sx: {
      [`.${axisClasses.left} .${axisClasses.label}`]: {
        transform: "translate(-20px, 0)",
      },
    },
  };

  return (
    <Stack>
      <Box>
        <Header></Header>
        <BarChart
          dataset={dataset}
          xAxis={[{ scaleType: "band", dataKey: "month" }]}
          series={[
            { dataKey: "london", label: "London", valueFormatter },
            { dataKey: "paris", label: "Paris", valueFormatter },
            { dataKey: "newYork", label: "New York", valueFormatter },
            { dataKey: "seoul", label: "Seoul", valueFormatter },
          ]}
          {...chartSetting}
        />
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
    </Stack>
  );
}

export default Expenses;

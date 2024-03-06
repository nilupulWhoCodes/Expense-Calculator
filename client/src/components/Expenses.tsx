import Box from "@mui/material/Box";
import Header from "./Header";
import AddExpense from "./AddExpenseButton";
import { useState, useEffect } from "react";
import axios from "axios";
import { Divider, Grid, SelectChangeEvent, Stack } from "@mui/material";
import { BarChart } from "@mui/x-charts/BarChart";
import { axisClasses } from "@mui/x-charts";
import * as React from "react";
import ExpensesByMonth from "./ExpensesByMonth";

interface Expenses {
  IID: number;
  VEXPENSETYPE: string;
  DDATE: Date;
  VMONTH: string;
  IAMOUNT: number;
}
interface Graph {
  month: string;
  data: { category: string; totalAmount: number }[];
}

function Expenses() {
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

  const date = new Date();
  const nowCurrentMonth = date.getMonth();
  const currentYear = date.getFullYear();

  const [currentMonth, setCurrentMonth] = useState(nowCurrentMonth);
  const monthName = months[currentMonth];

  const [selectedMonth, setSelectedMonth] = useState<string>(monthName);
  const [expenses, setExpenses] = useState<Expenses[]>([]);

  const [dataset, setDataset] = useState<{[key:string]:number | string} []>([]);

  const getData = async (selectedMonth: string) => {
    try {
      const res = await axios.get(
        `http://localhost:8800/expenses?month=${selectedMonth}`
      );
      setExpenses(res.data);

    } catch (error) {
      console.error(error);
    }
  };

  const getGraphData = async (currentYear: number) => {
    try {
      const res = await axios.get(
        `http://localhost:8800/expenses-category?year=${currentYear}`
      );

      const graphData = res.data;

      if (graphData && graphData.length > 0) {
        const transformedData = graphData.map((item:Graph) => {
          let dataObject: { [key: string]: number | string } = { 'month': item.month }
          item.data.forEach(data => {
            dataObject[data.category] = data.totalAmount;
          });
          return dataObject;
        });
        setDataset(transformedData);
      }

    } catch (error) {
      console.error(error);
    }
  }



  const handleMonthChange = (event: SelectChangeEvent<string | number>) => {
    const monthId = Number(event.target.value);
    const selectedMonthName = months[monthId];
    setCurrentMonth(monthId);
    setSelectedMonth(selectedMonthName);
  };

  useEffect(() => {
    getData(selectedMonth);
  }, [selectedMonth]);

  useEffect(() => {
    getGraphData(currentYear);
  }, [currentYear]);


  const valueFormatter = (value: number) => `Rs.${value}`;

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
        <Grid container direction="row">
          <Grid item md={6} xs={6}>
            <Header></Header>

          </Grid>
          <Grid item md={6} xs={6} style={{ display: 'flex', alignItems: 'center' }}>
            <AddExpense
              months={months}
              currentMonth={currentMonth}
              monthName={monthName}
            ></AddExpense>
          </Grid>
        </Grid>
        <Divider />
        <Grid container>
          <Grid item md={6} sm={12}>
          {dataset.length > 0 && (
            <BarChart
              dataset={dataset}
              xAxis={[{ scaleType: "band", dataKey: "month" }]}
              series={[
                { dataKey: "Food", label: "Food", valueFormatter },
                { dataKey: "Education", label: "Education", valueFormatter },
                { dataKey: "Clothes", label: "Clothes", valueFormatter },
                { dataKey: "Entertainment", label: "Entertainment", valueFormatter },
                { dataKey: "Utilities", label: "Utilities", valueFormatter },
                { dataKey: "Other", label: "Other", valueFormatter },
              ]}
              {...chartSetting}
            />
          )}  
          </Grid>
          <Grid item md={6} sm={12}>
            <ExpensesByMonth
              months={months}
              currentMonth={currentMonth}
              handleOnChange={handleMonthChange}
              expenseData={expenses}></ExpensesByMonth>
          </Grid>
        </Grid>
      </Box>
    </Stack>
  );
}

export default Expenses;

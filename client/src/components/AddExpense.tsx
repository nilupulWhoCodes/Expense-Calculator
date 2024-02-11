import React from "react";
import Box from "@mui/material/Box";
import { IconButton, Tooltip, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import Fade from "@mui/material/Fade";

interface AddExpenseProps {
  months: string[];
  currentMonth: number;
  monthName: string;
}

function AddExpense({ months, currentMonth, monthName }: AddExpenseProps) {
  const date = new Date();
  let year = date.getFullYear();

  return (
    <Box
      height={"5vh"}
      sx={{
        backgroundColor: "#FFFFFF",
        display: "flex",
        alignItems: "center",
        borderBottom: "solid",
      }}
    >
      <Typography variant="h6" sx={{ paddingLeft: 2 }}>
        {monthName} - {year}
      </Typography>
      <Tooltip
        TransitionComponent={Fade}
        TransitionProps={{ timeout: 600 }}
        title="Add new expense"
        sx={{ fontSize: 40, marginLeft: "auto" }}
      >
        <IconButton>
          <AddIcon></AddIcon>
        </IconButton>
      </Tooltip>
    </Box>
  );
}

export default AddExpense;

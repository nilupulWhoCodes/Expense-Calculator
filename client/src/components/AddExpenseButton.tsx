import React from "react";
import Box from "@mui/material/Box";
import { IconButton, Tooltip, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import Fade from "@mui/material/Fade";
import AddExpenseModal from "./AddExpenseModal";

interface AddExpenseButtonProps {
  months: string[];
  currentMonth: number;
  monthName: string;
}

function AddExpense({
  months,
  currentMonth,
  monthName,
}: AddExpenseButtonProps) {


  console.log(months);
  

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
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
        <IconButton onClick={handleOpen}>
          <AddIcon></AddIcon>
        </IconButton>
      </Tooltip>

      <AddExpenseModal
        openModal={open}
        handleClose={handleClose}
        months={months}
        activeMonth={monthName}
      ></AddExpenseModal>
    </Box>
  );
}

export default AddExpense;

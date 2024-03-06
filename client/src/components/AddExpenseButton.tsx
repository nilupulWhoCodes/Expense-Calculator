import React from "react";
import Box from "@mui/material/Box";
import { Button, Card, CardActionArea, CardContent, CardMedia, Grid, IconButton, Tooltip, Typography } from "@mui/material";
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

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const date = new Date();
  let year = date.getFullYear();

  return (
    <Grid container justifyContent="center" alignItems="center" maxHeight="100%" >
      <Grid item xs={12} md={12} sx={{ display: 'flex', justifyContent: 'flex-end',alignItems:"center" }}>
        <Button variant="contained" size="large" color="primary" onClick={handleOpen}> Add New Expense </Button>
      </Grid>
      <AddExpenseModal
        openModal={open}
        handleClose={handleClose}
        months={months}
        activeMonth={monthName}
      ></AddExpenseModal>
    </Grid>
  );
}

export default AddExpense;

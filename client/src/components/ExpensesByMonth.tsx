import { Collapse, Divider, FormControl, Grid, InputLabel, List, ListItemButton, ListItemIcon, ListItemText, ListSubheader, MenuItem, Select, SelectChangeEvent, Stack, Typography } from "@mui/material";
import Paper from '@mui/material/Paper';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import { StarBorder } from "@mui/icons-material";
import React from "react";

interface ExpensesByMonthProps {
    months: string[];
    currentMonth: number;
    handleOnChange: (event: SelectChangeEvent<string | number>) => void;
    expenseData: Record<string, any>;
}

function ExpensesByMonth({ months, currentMonth, handleOnChange, expenseData }: ExpensesByMonthProps) {

    const [open, setOpen] = React.useState(Array(Object.keys(expenseData).length).fill(false));

    const handleClick = (index: number) => {
        const newOpenState = [...open];
        newOpenState[index] = !newOpenState[index];
        setOpen(newOpenState);
    };

    return (
        <Grid container justifyContent={"center"} alignItems={"center"}>
            <Grid item xs={12} m={4}>
                <Paper>
                    <Stack direction="row" alignItems="center" justifyContent="space-between" >
                        <Typography m={3} variant="h6">Your Expenses</Typography>
                        <FormControl sx={{ m: 2, width: "35%" }} >
                            <InputLabel id="demo-simple-select-label">Month</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={currentMonth}
                                label="Month"
                                size="small"
                                onChange={handleOnChange}
                            >
                                {months.map((month, index) => (
                                    <MenuItem value={index}> {month} </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Stack>
                    <Divider variant="fullWidth" />
                    <Stack>

                        {expenseData && expenseData.length === 0 ? (
                            <Grid container direction="row" justifyContent={"center"} height={"10vh"} alignItems="center">
                                <Grid item xs={6} sm={4} md={6}>
                                    <Typography align="center">No Data Found</Typography>
                                </Grid>
                            </Grid>

                        ) : (
                            expenseData.map((expense: Record<string, any>, index: number) => (
                                <List key={index} disablePadding>
                                    <ListItemButton onClick={() => handleClick(index)}>
                                        <Grid container direction="row" justifyContent={"space-between"} alignItems="center">
                                            <Grid item xs={6} sm={4} md={6}>
                                                <Typography fontSize={17} fontWeight={"bold"}> {expense.category} </Typography>
                                            </Grid>
                                            <Grid item xs={5} sm={8} md={5}>
                                                <Stack direction={"row"} alignItems="center" gap={2} justify-content="space-evenly">
                                                    <Typography fontWeight={"bold"} fontSize={13} color={"f1f1f1"} fontFamily={"monospace"}> LKR  </Typography>
                                                    <Typography fontWeight={"bold"} fontSize={17}>  {expense.totalAmount.toLocaleString(undefined, { useGrouping: true })} </Typography>
                                                </Stack>
                                            </Grid>
                                            <Stack direction={"row"} alignItems="center" justify-content="flex-end">
                                                {open[index] ? <ExpandLess /> : <ExpandMore />}
                                            </Stack>
                                        </Grid>
                                    </ListItemButton>
                                    <Divider/>
                                    <Collapse in={open[index]} timeout="auto" unmountOnExit>
                                        {expense.subexpenses && expense.subexpenses.map(({ subcategory, amount }: { subcategory: string; amount: number | string }, index: number) => (
                                            <List component="div" key={index} disablePadding >
                                                <Grid container direction="row" alignItems="center" spacing={2}>
                                                    <Grid item xs={9} md={9} sm={9}>
                                                        <ListItemButton sx={{ pl: 4 }}>
                                                            <ListItemIcon>
                                                                <StarBorder />
                                                            </ListItemIcon>
                                                            <ListItemText primary={subcategory} sx={{ fontSize: 13 }} />
                                                        </ListItemButton>
                                                    </Grid>
                                                    <Grid item xs={3} md={3} sm={3} display="flex" justifyContent="center">
                                                        <Stack direction="row" alignItems="center" gap={1} justifyContent="space-evenly">
                                                            <Typography fontWeight="bold" fontSize={13} color="f1f1f1" fontFamily="monospace"> LKR </Typography>
                                                            <Typography sx={{ fontSize: 15 }}>{`${typeof amount === 'number' ? amount.toLocaleString(undefined, { useGrouping: true }) : ''}`}</Typography>
                                                        </Stack>
                                                    </Grid>
                                                </Grid>
                                            </List>
                                        ))}
                                    </Collapse>
                                </List>
                            ))
                        )}
                    </Stack>
                </Paper>
            </Grid>
        </Grid>
    );
}

export default ExpensesByMonth;
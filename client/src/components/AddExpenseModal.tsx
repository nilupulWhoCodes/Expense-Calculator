import _ from "lodash";
import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  Grid,
  InputLabel,
  MenuItem,
  Modal,
  Select,
  SelectChangeEvent,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";

interface AddExpenseModalProps {
  openModal: boolean;
  handleClose: () => void;
  months: string[];
  activeMonth: string;
}

type Expenses = {
  [category: string]: string[] | string;
};

export default function AddExpenseModal({
  openModal,
  handleClose,
  months,
  activeMonth,
}: AddExpenseModalProps) {
  const expenses: Expenses = {
    Food: ["Vegitables", "Meat", "Rice", "Ingrediants", "Take-Outs", "Fruits"],
    Education: ["Course", "University", "School"],
    Clothes: ["Office Wears", "Casual Wears", "Party Wears"],
    Entertainment: ["Subscriptions"],
    Utilities: ["Water", "Electricity", "Broadband"],
    Other: [],
  };

  //error-handling
  const [categoryError, setCategoryError] = useState<string>("");
  const [inputError, setInputError] = useState<string>("");

  const [category, setCategory] = useState<string>("");
  const [expenseTypes, setExpenseType] = useState<string[]>([]);
  const [total, setTotal] = useState<number>(0);
  const [inputValues, setInputValues] = useState<{ [key: string]: string }>({});


  const handleCategorySelect = (event: SelectChangeEvent<string>) => {
    setCategoryError("");
    setInputValues({});
    setTotal(0);
    const selectedCategory = event.target.value;
    setCategory(selectedCategory);
    setExpenseType(expenses[selectedCategory] as string[]);
  };

  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputError("");
    const { id, value } = event.target;
    setInputValues((prevInputValues: object) => ({
      ...prevInputValues,
      [id]: value,
    }));
  };
  useEffect(() => {
    const valuesArray = Object.values(inputValues);

    const formattedValues = valuesArray.map((value) => formatNumber(value));
    let total = 0;
    formattedValues.map((item) => {
      total = total + item;
    });
    setTotal(total);
  }, [inputValues]);

  const formatNumber = (value: string) => {
    if (value) {
      return parseInt(value);
    }
    return NaN;
  };

  const style = {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 1000,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 1,
  };

  const postExpenses = async (requestData: { [key: string]: any }) => {
    try {
      const response = await axios.post(
        "http://localhost:8800/add-expense",
        requestData
      );
    } catch (error) {}
  };

  const isObjectEmpty = (objectName: Record<string, any>): boolean => {
    return _.isEmpty(objectName);
  };

  const handleSubmit = () => {
    if (category === "") {
      return setCategoryError("Please select a category");
    }
    if (isObjectEmpty(inputValues)) {
      return setInputError("Please enter an amount");
    }

    const jsonRequest = {
      month: activeMonth,
      category: category,
      expenses: inputValues,
    };
    postExpenses(jsonRequest);
  };

  const ModalTitle = () => (
    <Typography
      style={{ borderBottom: "0.5px solid" }}
      id="modal-title"
      variant="h6"
      component="h2"
      textAlign="left"
    >
      Add a new expense
    </Typography>
  );

  const ExpenseType = () => {
    return (
      <Grid container spacing={1}>
        <Grid item xs={6} md={6}>
          <Stack width={"100%"}>
            <FormControl size="small">
              <InputLabel id="month-name">Month</InputLabel>
              <Select
                labelId="month-name"
                value={activeMonth}
                label="Expense Type"
                defaultValue={activeMonth}
                sx={{
                  fontSize: 14,
                }}
              >
                {months.map((month) => {
                  return <MenuItem value={month}> {month}</MenuItem>;
                })}
              </Select>
            </FormControl>
          </Stack>
        </Grid>
        <Grid item xs={6} md={6}>
          <Stack width={"100%"}>
            <FormControl size="small">
              <InputLabel id="demo-select-small-label">Expense Type</InputLabel>
              <Select
                labelId="demo-select-small-label"
                value={category}
                label="Expense Type"
                onChange={handleCategorySelect}
                sx={{
                  fontSize: 14,
                }}
              >
                {Object.keys(expenses).map((expense) => {
                  return <MenuItem value={expense}> {expense}</MenuItem>;
                })}
              </Select>
            </FormControl>
            <Typography fontSize={11} color={"red"}>
              {categoryError}
            </Typography>
          </Stack>
        </Grid>
      </Grid>
    );
  };

  const ModalFooter = () => {
    return (
      <Stack
        display="flex"
        flexWrap={"wrap"}
        gap={3}
        borderTop={1}
        borderColor="#DCDCDC"
        direction={"row"}
        justifyContent={"space-between"}
      >
        <Stack justifyContent="center">
          <Typography color={"blue"}>Rs. {total}</Typography>
        </Stack>

        <Stack
          m={1}
          gap={2}
          direction="row"
          justifyContent="flex-end"
          width={"50%"}
        >
          <Button
            sx={{ width: "20%" }}
            size="small"
            variant="outlined"
            color="success"
          >
            Clear
          </Button>
          <Button
            sx={{ width: "20%" }}
            size="small"
            variant="outlined"
            color="success"
            onClick={handleSubmit}
          >
            Submit
          </Button>
        </Stack>
      </Stack>
    );
  };

  return (
    <Modal
      open={openModal}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Stack display={"flex"} height={"50vh"} style={{ overflowY: "auto" }}>
          <ModalTitle />
          <Typography id="modal-modal-description" sx={{ mt: 2, mb: 3 }}>
            Month - February
          </Typography>
          <ExpenseType />
          <Stack
            display={"flex"}
            direction={"row"}
            flexWrap={"wrap"}
            gap={1}
            m={1}
            mb={3}
          >
            {expenseTypes.map((type) => (
              <FormControl sx={{ mt: 2, width: "49%" }} key={type} size="small">
                <TextField
                  id={type}
                  label={type}
                  variant="outlined"
                  onChange={(e: any) => handleOnChange(e)}
                />
                {inputError && (
                  <FormHelperText style={{ color: "red" }}>
                    {inputError}
                  </FormHelperText>
                )}
              </FormControl>
            ))}
          </Stack>
        </Stack>
        <ModalFooter />
      </Box>
    </Modal>
  );
}

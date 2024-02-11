
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Stack } from "@mui/material";


const ShowExpenses =  ({ expenseData }: { expenseData: Array<any> }) => {
  
  return (

    
    <>
      {expenseData.length === 0 ? (
        <p>No Data To Display</p>
      ) : (
        <Stack pt={3}>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Expense</TableCell>
                  <TableCell align="right">Date And Time</TableCell>
                  <TableCell align="right">Month</TableCell>
                  <TableCell align="right">Amount</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {expenseData.map((row) => (
                  <TableRow
                    key={row.IID}
                    sx={{
                      "&:last-child td, &:last-child th": { border: 0 },
                      backgroundColor: row.IID === 0 ? "#FFFFFF" : "#F1F1F1",
                    }}
                  >
                    <TableCell component="th" scope="row">
                      {row.VEXPENSETYPE}
                    </TableCell>
                    <TableCell align="right">
                      {new Date(row.DDATE).toLocaleString()}
                    </TableCell>
                    <TableCell align="right">{row.VMONTH}</TableCell>
                    <TableCell align="right">{row.IAMOUNT}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Stack>
      )}
    </>
  );
};

export default ShowExpenses;

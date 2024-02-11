import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
interface MonthBarProps {
  months: string[];
  currentMonth: number;
  onMonthClick: (index: number) => void;
}

function MonthBar({ months, currentMonth, onMonthClick }: MonthBarProps) {
  
  return (
    
    <Box sx={{ backgroundColor: "#FCFCFC", display: "flex" }}>
      {months.map((month, index) => (
        <Typography
          key={index}
          sx={{
            textAlign: "center",
            margin: "auto",
            p: 1,
            backgroundColor: index === currentMonth ? "#DBDFEA" : "transparent",
            cursor:"pointer"
          }}
          onClick={() => onMonthClick(index)}
        >
          {month}
        </Typography>
      ))}
    </Box>
  );
}

export default MonthBar;

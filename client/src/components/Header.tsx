import React from "react";
import { Typography } from "@mui/material";

function Header() {
    return (
        <div>
            <Typography variant="h3" fontFamily={'monospace'} textAlign={'center'}>
                Expense Calculator
            </Typography>
        </div>
    );
}

export default Header;
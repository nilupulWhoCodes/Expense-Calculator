import React from "react";
import { Stack, Typography } from "@mui/material";

function Header() {
    return (
        <Stack m={3}>
            <Typography variant="h4" fontFamily={'monospace'}>
                Expense Calculator
            </Typography>
        </Stack>
    );
}

export default Header;
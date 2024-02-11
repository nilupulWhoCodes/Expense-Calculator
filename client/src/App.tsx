import Box from "@mui/material/Box";
import Header from "./components/Header";
import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Expenses from "./components/Expenses";

function App() {
  return (
    <Box>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Expenses />} />
          <Route path="/expenses" element={<Expenses />} />
        </Routes>
      </BrowserRouter>
    </Box>
  );
}

export default App;

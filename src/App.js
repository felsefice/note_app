import React from "react";
import InpSearch from "./components/InpSearch";
import Header from "./components/Header";
import NoteAdd from "./components/NoteAdd";
import { Box } from "@mui/material";
import NoteList from "./components/NoteList";

function App() {
  return (
    <Box sx={{bgcolor:"#eeeeee", m:5}}>
      <Header />
      <InpSearch />
      <NoteAdd />
      <NoteList />
    </Box>
  );
}

export default App;

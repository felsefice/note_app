import * as React from "react";
import { styled, alpha } from "@mui/material/styles";
import Box from "@mui/material/Box";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { filterNote } from "../redux/notes/notesSlice";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: "#fafafa",
  },
  // marginLeft: 0,
  marginLeft: "25%",
  marginRight: "25%",
  // [theme.breakpoints.up("xl")]: {
  //   marginLeft: theme.spacing(1),
  //   width: "auto",
  // },
  background: "white",
  
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(1, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  cursor: "pointer",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("xl")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));

export default function InpSearch() {
  const dispatch = useDispatch();

  const [filterText, setFilterText] = useState("");

  const handleChange = (e) => {
    setFilterText(e.target.value);
    dispatch(filterNote(e.target.value));
  };

  return (
    <Box sx={{ flexGrow: 1, m: 1 }}>
      <Search sx={{borderRadius: "24px",}} >
        <SearchIconWrapper>
          <SearchIcon />
        </SearchIconWrapper>
        <StyledInputBase
          placeholder="Search…"
          inputProps={{ "aria-label": "search" }}
          onChange={handleChange}
          value={filterText}
        />
      </Search>
    </Box>
  );
}

import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import { CirclePicker } from "react-color";
import { addNewNote } from "../redux/notes/notesSlice";
import { useState, } from "react";
import { useDispatch, } from "react-redux";
import { nanoid } from "@reduxjs/toolkit";

export default function NoteAdd() {
  const dispatch = useDispatch();
  const [detail, setDetail] = useState("");
  const [color, setColor] = useState("");
  const title =
    detail.split(" ").length === 1
      ? detail.split("").slice(0, 7).join("")
      : detail.split(" ").slice(0, 2).join(" ");

  const date = new Date();
  const day = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate();
  const month =
    date.getMonth() + 1 < 10 ? `0${date.getMonth() + 1}` : date.getMonth() + 1;
  const year = date.getFullYear();
  const dateNote = `${day}.${month}.${year}`;

  const handleClick = (e) => {
    e.preventDefault();

    dispatch(
      addNewNote({
        id: nanoid(),
        title,
        detail,
        color,
        isEditing: false,
        dateNote,
      })
    );

    setDetail("");
    setColor("");
  };

  return (
    <Box
      sx={{
        background: "white",
        mt: 2,
        ml: "5%",
        mr: "5%",
        p: 1,
      }}
    >
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Enter Your Note Here..."
            id="fullWidth"
            value={detail}
            onChange={(e) => setDetail(e.target.value)}
          />
        </Grid>
        <Grid
          item
          xs={12}
          sm={9}
          sx={{ mt: "30%", ml: 2, display: "flex", alignItems: "center" }}
        >
          <CirclePicker
            onChange={(color) => setColor(color.hex)}
            circleSize={24}
          />
        </Grid>
        <Grid item xs={12} sm={2} sx={{ mt: "35%", ml: 1 }}>
          <Button
            variant="contained"
            sx={{
              bgcolor: "#388e3c",
              borderRadius: 4,
              "&:hover": {
                backgroundColor: "green",
              },
              float: "inline-end",
            }}
            onClick={handleClick}
          >
            ADD
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
}

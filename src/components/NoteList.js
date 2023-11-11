import * as React from "react";

import {
  Accordion,
  Box,
  Grid,
  AccordionSummary,
  AccordionDetails,
  Typography,
  IconButton,
  Button,
  Input,
} from "@mui/material";

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import EditIcon from "@mui/icons-material/Edit";

import { useDispatch, useSelector } from "react-redux";
import { deleteNote, editNote, saveNote, } from "../redux/notes/notesSlice";
import { useState, } from "react";

export default function NoteList() {

  const items = useSelector((state) => state.notes.items);
  localStorage.setItem("noteItems", JSON.stringify(items));
  
  const dispatch = useDispatch();
  const filters = useSelector((state) => state.notes.filters);
  const [detail, setDetail] = useState("");

  const filtered = items.filter((item) => {
    return Object.keys(item).some((key) =>
      item[key].toString().toLowerCase().includes(filters.toLowerCase())
    );
  });

  return (
    <Box sx={{ flexGrow: 1, m: 1, pt: 2, pb: 5, ml: "3%", mr: "3%" }}>
      <Grid container spacing={2}>
        {filtered.map((item) => (
          <Grid item key={item.id} xs={6} sm={4}>
            <Accordion sx={{ bgcolor: item.color }}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls={`panel${item.id}a-content`}
                id={`panel${item.id}a-header`}
              >
                <Typography sx={{ fontSize: "14px", fontWeight: "bolder" }}>
                  {item.title} ...
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography sx={{ fontSize: "14px" }}>{item.detail}</Typography>
                <Typography
                  sx={{
                    fontSize: "12px",
                    p: 1,
                    position: "absolute",
                    right: 0,
                    fontWeight: "bolder",
                  }}
                >
                  {item.dateNote}
                </Typography>
                <Box sx={{ mt: 2, pt: 2 }}>
                  <Grid container spacing={1}>
                    <Grid item xs={6}>
                      {item.isEditing ? (
                        <Box>
                          <Input
                            type="text"
                            sx={{ width: "125%" }}
                            onChange={(e) => setDetail(e.target.value)}
                          />
                          <Button
                            sx={{
                              bgcolor: item.color,
                              mt: "4px",
                              ml: "-14px",
                              color: "black",
                            }}
                            onClick={() => {
                              dispatch(
                                saveNote({ id: item.id, detail: detail })
                              );
                              setDetail("");
                            }}
                          >
                            Edit
                          </Button>
                        </Box>
                      ) : (
                        <IconButton
                          onClick={() => dispatch(editNote(item.id))}
                          sx={{
                            "&:hover": {
                              color: "#4caf50",
                            },
                            ml: "-5px",
                          }}
                        >
                          <EditIcon />
                        </IconButton>
                      )}
                    </Grid>
                    <Grid item xs={6}>
                      <IconButton
                        sx={{
                          position: "absolute",
                          right: "10px",
                          "&:hover": {
                            color: "#ff7043",
                          },
                        }}
                        onClick={() => dispatch(deleteNote(item.id))}
                      >
                        <DeleteForeverIcon />
                      </IconButton>
                    </Grid>
                  </Grid>
                </Box>
              </AccordionDetails>
            </Accordion>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

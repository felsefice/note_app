import { createSlice } from "@reduxjs/toolkit";

const localNote =
  localStorage.getItem("noteItems") !== null
    ? JSON.parse(localStorage.getItem("noteItems"))
    : [];

export const notesSlice = createSlice({
  name: "notes",
  initialState: {
    items: localNote,
    filters: "",
  },
  reducers: {
    addNewNote: (state, action) => {
      state.items.push(action.payload);
    },
    deleteNote: (state, action) => {
      const id = action.payload;
      const filtered = state.items.filter((item) => item.id !== id);
      state.items = filtered;
    },
    editNote: (state, action) => {
      const id = action.payload;
      const item = state.items.find((item) => item.id === id);
      item.isEditing = !item.isEditing;
    },
    saveNote: (state, action) => {
      const { id, detail } = action.payload;
      const item = state.items.find((item) => item.id === id);
      item.detail = detail === "" ? item.detail : detail;
      item.title =
        item.detail && item.detail.split(" ").length === 1
          ? item.detail.split("").slice(0, 7).join("")
          : item.detail.split(" ").slice(0, 2).join(" ");
      item.isEditing = !item.isEditing;
    },
    filterNote: (state, action) => {
      const filterText = action.payload;
      state.filters = filterText;
    },
  },
});

export const { addNewNote, deleteNote, editNote, saveNote, filterNote } =
  notesSlice.actions;
export default notesSlice.reducer;

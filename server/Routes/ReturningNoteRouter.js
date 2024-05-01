// returnNoteRouter.js
const express = require("express");
const router = express.Router();
const returnNoteController = require("../Controllers/ReturningNoteController");

// Create a new ReturnNote
router
  .post("/returnNotes", returnNoteController.createReturnNote)
  .get("/returnNotes", returnNoteController.getAllReturnNotes)
  .get("/returnNotes/:id", returnNoteController.getReturnNoteById)
  .put("/returnNotes/:id", returnNoteController.updateReturnNote)
  .delete("/returnNotes/:id", returnNoteController.deleteReturnNote);

module.exports = router;

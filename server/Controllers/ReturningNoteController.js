// returnNoteController.js
const db = require("../models");

// Create a new ReturnNote
exports.createReturnNote = async (req, res) => {
  try {
    const returnNote = await db.ReturnNote.create(req.body);
    res.status(201).json(returnNote);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Retrieve all ReturnNotes
exports.getAllReturnNotes = async (req, res) => {
  try {
    const returnNotes = await db.ReturnNote.findAll();
    res.status(200).json(returnNotes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Retrieve a single ReturnNote by ID
exports.getReturnNoteById = async (req, res) => {
  const { id } = req.params;
  try {
    const returnNote = await db.ReturnNote.findByPk(id);
    if (!returnNote) {
      res.status(404).json({ error: "ReturnNote not found" });
    } else {
      res.status(200).json(returnNote);
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update a ReturnNote by ID
exports.updateReturnNote = async (req, res) => {
  const { id } = req.params;
  try {
    const [updated] = await db.ReturnNote.update(req.body, {
      where: { return_note_id: id },
    });
    if (updated) {
      const updatedReturnNote = await db.ReturnNote.findByPk(id);
      res.status(200).json(updatedReturnNote);
    } else {
      res.status(404).json({ error: "ReturnNote not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete a ReturnNote by ID
exports.deleteReturnNote = async (req, res) => {
  const { id } = req.params;
  try {
    const deleted = await db.ReturnNote.destroy({
      where: { return_note_id: id },
    });
    if (deleted) {
      res.status(204).send();
    } else {
      res.status(404).json({ error: "ReturnNote not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

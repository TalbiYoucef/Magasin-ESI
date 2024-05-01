const express = require('express');
const router = express.Router();
const exitNoteController = require('../Controllers/ExitNoteController');
router.post('/', exitNoteController.createExitNote)
.get('/', exitNoteController.getAllExitNotes)
.get('/:id', exitNoteController.getExitNoteById)
.put('/:id', exitNoteController.updateExitNote)
.delete('/:id', exitNoteController.deleteExitNote);
module.exports = router;

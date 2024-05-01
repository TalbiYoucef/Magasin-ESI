const express = require('express');
const router = express.Router();
const exitNoteController = require('../Controllers/ExitNoteController');
router.post('/exitNotes', exitNoteController.createExitNote)
.get('/exitNotes', exitNoteController.getAllExitNotes)
.get('/exitNotes/:id', exitNoteController.getExitNoteById)
.put('/exitNotes/:id', exitNoteController.updateExitNote)
.delete('/exitNotes/:id', exitNoteController.deleteExitNote);

module.exports = router;

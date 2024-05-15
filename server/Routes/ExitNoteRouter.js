const express = require('express');
const router = express.Router();
const { verifyAccess,checkAuthorization } = require("../Middlewares/verifyAccess");

const exitNoteController = require('../Controllers/ExitNoteController');
router.post('/',verifyAccess([15,16]),checkAuthorization, exitNoteController.createExitNote)
.get('/', exitNoteController.getAllExitNotes)
.get('/:id', exitNoteController.getExitNoteById)
.put('/:id', verifyAccess([15,16]),checkAuthorization,exitNoteController.updateExitNote)
.delete('/:id',verifyAccess([15,16]),checkAuthorization, exitNoteController.deleteExitNote);
module.exports = router;

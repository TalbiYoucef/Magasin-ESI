const router=require('express').Router()
const {getAllReceiptNotes,getReceiptNoteById,createReceiptNote}=require('../Controllers/ReceiptNoteController')
router
.get('/',getAllReceiptNotes)
.get('/:id',getReceiptNoteById)
.post('/:id',createReceiptNote)
module.exports=router

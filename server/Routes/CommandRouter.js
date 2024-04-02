const router = require('express').Router();
const{ getCommands, getCommandById,createCommand,deleteCommand,assignProductToCommand,removeProductFromCommand, getAllCommandProducts} = require('../Controllers/CommandController');

router
.get('/', getCommands)
.get('/:id', getCommandById)
.post('/', createCommand)
.delete('/:id', deleteCommand)
.post('/:id/products', assignProductToCommand)
.delete('/:id/products', removeProductFromCommand)
.get('/:id/products', getAllCommandProducts);

module.exports = router;
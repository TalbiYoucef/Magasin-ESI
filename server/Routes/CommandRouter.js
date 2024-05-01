const router = require('express').Router();
const{ getCommands,getPurchasingOrder,updateProductToCommand, getCommandById,createCommand,deleteCommand,assignProductToCommand,removeProductFromCommand, getAllCommandProducts} = require('../Controllers/CommandController');

router
.get('/', getCommands)
.get('/:id', getCommandById)
.post('/', createCommand)
.delete('/:id', deleteCommand)
.post('/:id/products', assignProductToCommand)
.put('/:id/products', updateProductToCommand)
.delete('/:id/products', removeProductFromCommand)
.get('/:id/products', getAllCommandProducts)
.get('/:id/purchasing-order', getPurchasingOrder);

module.exports = router;
const router = require('express').Router();
const{ getCommands,getPurchasingOrder,updateProductToCommand, getCommandById,createCommand,deleteCommand,assignProductToCommand,removeProductFromCommand, getAllCommandProducts, getInteranlOrder, getExternalCommands, updateQuantities} = require('../Controllers/CommandController');

router
.get('/', getCommands)
.get('/external-commands', getExternalCommands)
.get('/:id', getCommandById)
.post('/', createCommand)
.delete('/:id', deleteCommand)
.post('/:id/products', assignProductToCommand)
.put('/:id/products', updateProductToCommand)
.delete('/:id/products', removeProductFromCommand)
.get('/:id/products', getAllCommandProducts)
.get('/:id/purchasing-order', getPurchasingOrder)
.put('/:id/updateQuantities', updateQuantities)
.get('/:id/internal-order', getInteranlOrder);

module.exports = router;
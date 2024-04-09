const router = require('express').Router()
const { getAllSuppliers, createSupplier, getSupplierById,deleteSupplier,updateSupplier} = require('../Controllers/SupplierController')
router
.get('/', getAllSuppliers)
.post('/', createSupplier)
.get('/:id', getSupplierById)
.put('/:id', updateSupplier)
.delete('/:id', deleteSupplier)

module.exports=router

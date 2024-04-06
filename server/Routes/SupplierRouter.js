const router = require('express').Router()
const { getAllSuppliers, createSupplier, getSupplierById,deleteSupplier,updateSupplier, assignProductPrice,unassignProductPrice } = require('../Controllers/SupplierController')
router
.get('/', getAllSuppliers)
.post('/', createSupplier)
.get('/:id', getSupplierById)
.put('/:id', updateSupplier)
.delete('/:id', deleteSupplier)
.post('/:id/product', assignProductPrice)
.delete('/:id/product', unassignProductPrice)
module.exports=router

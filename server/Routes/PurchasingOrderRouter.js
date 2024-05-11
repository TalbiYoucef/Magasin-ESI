const router = require('express').Router()
const {getAllPurchasingOrders,getreceipts,getPurchasingOrderById,createPurchasingOrder,deletePurchasingOrder,updatePurchasingOrderStatus, getreceiptById, getCommand} = require('../Controllers/PurchasingOrderController')

router
.get('/',getAllPurchasingOrders)
.get('/:id',getPurchasingOrderById)
.get('/:id/receipts',getreceipts)
.get('/:id/receipts/:rid',getreceiptById)
.get('/:id/command',getCommand)
.post('/',createPurchasingOrder)
.delete('/:id',deletePurchasingOrder)
.put('/:id',updatePurchasingOrderStatus)

module.exports=router
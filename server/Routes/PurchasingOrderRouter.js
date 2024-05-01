const router = require('express').Router()
const {getAllPurchasingOrders,getreceipts,getPurchasingOrderById,createPurchasingOrder,deletePurchasingOrder,updatePurchasingOrderStatus} = require('../Controllers/PurchasingOrderController')

router
.get('/',getAllPurchasingOrders)
.get('/:id',getPurchasingOrderById)
.get('/:id/receipts',getreceipts)
.post('/',createPurchasingOrder)
.delete('/:id',deletePurchasingOrder)
.put('/:id',updatePurchasingOrderStatus)

module.exports=router
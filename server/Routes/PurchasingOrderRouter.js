const router = require('express').Router()
const {getAllPurchasingOrders,getPurchasingOrderById,createPurchasingOrder,deletePurchasingOrder,updatePurchasingOrderStatus} = require('../Controllers/PurchasingOrderController')

router
.get('/',getAllPurchasingOrders)
.get('/:id',getPurchasingOrderById)
.post('/',createPurchasingOrder)
.delete('/:id',deletePurchasingOrder)
.put('/:id',updatePurchasingOrderStatus)

module.exports=router
const db = require('../models/')
const getAllPurchasingOrders = async (req, res) => {
    try {
        const purchasingOrders = await db.PurchasingOrder.findAll();
        if (!purchasingOrders || purchasingOrders.length === 0) {
            return res.status(404).json({ message: `no purchasing orders found!` });
        }
        return res.status(201).json({ purchasingOrders });
    } catch (error) {
        console.log(error)
        return res.status(400).json({ error: error.message });
    }
}
const getPurchasingOrderById = async (req, res) => {
    try {
        const { id } = req.params
        const purchasingOrder = await db.PurchasingOrder.findOne({ where: { order_id: id } });
        if (!purchasingOrder) {
            return res.status(404).json({ message: `no purchasing order found with id ${req.params.id}!` });
        }
        return res.status(201).json({ purchasingOrder });
    }
    catch (error) {
        console.log(error)
        return res.status(400).json({ error: error.message });
    }
}
const createPurchasingOrder = async (req, res) => {
    // try {
    //     const { supplier_id, command_id, expected_delivery_date, payment_method, notes } = req.body;
    //     const commandProducts = await db.Product_Command.findMany({ where: { command_id: command_id } }); // getting all the command's products
    //     const supplierProducts = await Promise.all(commandProducts.map(product => {
    //         return db.Product.findOne({ where: { product_id: product.product_id, supplier_id:supplier_id } });
    //     }));
    //     const totalCost = supplierProducts.reduce((total, product) => total + product.price, 0);

    //     const purchasingOrder = await db.PurchasingOrder.create({ id_supplier: id_supplier, expected_delivery_date: expected_delivery_date, id_products: id_products, payment_method: payment_method, notes: notes, total_price: totalCost });
    //     return res.status(201).json(purchasingOrder);
    // }
    // catch (error) {
    //     return res.status(500).json({ error: 'Failed to create purchasing order' });
    // }
    // a refaire
}
const deletePurchasingOrder = async (req, res) => {
    try {
        const { id } = req.params;
        const purchasingOrder = await db.PurchasingOrder.findOne({ where: { order_id: id } });
        if (purchasingOrder) {
            if(!purchasingOrder.status === 'pending'){
                return res.status(400).json({ error: 'Cannot delete a purchasing order that is not pending' });
            }
            await purchasingOrder.destroy();
            return res.status(200).json({ message: 'Purchasing order deleted successfully' });
        } else {
            return res.status(404).json({ error: 'Purchasing order not found' });
        }
    } catch (error) {
        return res.status(500).json({ error: 'Failed to delete purchasing order' });
    }
}
const updatePurchasingOrderStatus=async (req,res)=>{
    const {id}=req.params;
    const {status}=req.body;
    const purchasingOrder=await db.PurchasingOrder.findOne({where:{order_id:id}});
    if(!purchasingOrder){
        return res.status(404).json({message:"Purchasing order not found"});
    }
    if(status){
        purchasingOrder.status=status;
    }
}
module.exports={getAllPurchasingOrders,getPurchasingOrderById,createPurchasingOrder,deletePurchasingOrder,updatePurchasingOrderStatus}
const express = require("express");
const router = express.Router();
const internalOrderController = require("../Controllers/InternalOrderController");

router
  .post("/", internalOrderController.createInternalOrder)
  .get("/", internalOrderController.getAllInternalOrders)
  .get("/:id", internalOrderController.getInternalOrderById)
  .put("/:id", internalOrderController.updateInternalOrder)
  .get("/status/:status", internalOrderController.getOrdersByStatus)
  .put("/:id/status", internalOrderController.updateOrderStatus)
  .delete("/:id", internalOrderController.deleteInternalOrder);

module.exports = router;

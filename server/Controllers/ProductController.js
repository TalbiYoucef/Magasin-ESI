// const Product = require('../Models/Product');
const db = require("../models");
const createProduct = async (req, res) => {
  try {
    const { name, quantity,limit,description } = req.body;
    const productExists = await db.Product.findOne({ where: { name: name } });
    if (productExists) {
      return res.status(400).json({ error: "Product already exists" });
    }
    const product = await db.Product.create({
      name: name,
      description:description,
      quantity:quantity,
      limit:limit,
    });
    return res.status(201).json(product);
  } catch (error) {
    return res.status(500).json({ error: "Failed to create product" },error);
  }
};

const getAllProducts = async (req, res) => {
  try {
    const products = await db.Product.findAll();
    if (!products || products.length === 0) {
      return res.status(404).json({ error: "No products found" });
    }
    return res.status(200).json(products);
  } catch (error) {
    return res.status(500).json({ error: "Failed to retrieve products" });
  }
};
const getProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await db.Product.findOne({ where: { product_id: id } });
    if (product) {
      return res.status(200).json(product);
    } else {
      return res.status(404).json({ error: "Product not found" });
    }
  } catch (error) {
    return res.status(500).json({ error: "Failed to retrieve product" });
  }
};
const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await db.Product.findOne({ where: { product_id: id } });
    if (product) {
      await product.destroy();
      return res.status(200).json({ message: "Product deleted successfully" });
    } else {
      return res.status(404).json({ error: "Product not found" });
    }
  } catch (error) {
    return res.status(500).json({ error: "Failed to delete product" });
  }
};
const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, quantity } = req.body;
    const product = await db.Product.findOne({ where: { product_id: id } });
    if (product) {
      product.name = name;
      product.quantity = quantity;
      await product.save();
      return res.status(200).json(product);
    } else {
      return res.status(404).json({ error: "Product not found" });
    }
  } catch (error) {
    return res.status(500).json({ error: "Failed to update product" });
  }
};
const assignProductToBranch = async (req, res) => {
  try {
    const { id } = req.params;
    const { branch_id } = req.body;
    try {
      const product = await db.Product.findByPk(id);
      if (!product) {
        return res.status(404).json({ error: "Product not found" });
      }
      if (product.branch_id == branch_id) {
        return res
          .status(400)
          .json({ error: "Product already assigned to this branch" });
      }
      product.branch_id = branch_id;
      await product.save();
      return res
        .status(200)
        .json({ message: "Product assigned to branch successfully" });
    } catch (error) {
      console.log(error);
      return res
        .status(400)
        .json({ message: "failed to assign product to branch" });
    }
  } catch (error) {
    return res
      .status(500)
      .json({ error: "Failed to assign product to branch" });
  }
};

const removeProductFromBranch = async (req, res) => {
  try {
    const { id } = req.params;
    try {
      const product = await db.Product.findOne({ where: { product_id: id } });
      if (!product) {
        return res.status(404).json({ error: "Product not found" });
      }
      await product.update({ branch_id: null });
      return res
        .status(200)
        .json({ message: "Product removed from branch successfully" });
    } catch (error) {
      return res.json({ err: error });
    }
  } catch (error) {
    return res
      .status(500)
      .json({ error: "Failed to remove product from branch" });
  }
};
const updateProductQuantityInCommand = async (req, res) => {
  try {
    const { id } = req.params;
    const { quantity, command_id } = req.body;
    const purchaseOrder = await db.PurchasingOrder.findOne({
      where: { order_id: command_id },
    });
    if (!purchaseOrder) {
      return res.status(404).json({ message: "Command not found" });
    }
    if (purchaseOrder.status !== "pending") {
      return res
        .status(400)
        .json({
          message:
            "Cannot update product quantity in a command that is not pending",
        });
    }
    const product = await db.Product_Quantity.findOne({
      where: { product_id: id, command_id: command_id },
    });
    if (!product) {
      return res.status(404).json({ message: "Product not found in command" });
    }
    product.quantity = quantity;
    await product.save();
    return res
      .status(200)
      .json({ message: "Product quantity updated successfully" });
  } catch (error) {
    return res
      .status(500)
      .json({ error: "Failed to update product quantity in command" });
  }
};
const deleteProductFromPurchaseOrder = async (req, res) => {
  try {
    const { id } = req.params;
    const { command_id } = req.body;
    const purchaseOrder = await db.PurchasingOrder.findOne({
      where: { order_id: command_id },
    });
    if (!purchaseOrder) {
      return res.status(404).json({ message: "Command not found" });
    }
    if (purchaseOrder.status !== "pending") {
      return res
        .status(400)
        .json({
          message: "Cannot delete product from a command that is not pending",
        });
    }
    const product = await db.Product_Quantity.findOne({
      where: { product_id: id, command_id: command_id },
    });
    if (!product) {
      return res.status(404).json({ message: "Product not found in command" });
    }
    await db.Product_Quantity.destroy({
      where: { product_id: id, command_id: command_id },
    });
    return res.status(200).json({ message: "Product removed from command" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
module.exports = {
  createProduct,
  getAllProducts,
  getProductById,
  deleteProduct,
  updateProduct,
  assignProductToBranch,
  removeProductFromBranch,
  updateProductQuantityInCommand,
  deleteProductFromPurchaseOrder,
};

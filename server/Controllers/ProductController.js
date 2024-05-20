// const Product = require('../Models/Product');
const db = require("../models");
const createProduct = async (req, res) => {
  try {
    const { name, quantity, limit, description } = req.body;
    const productExists = await db.Product.findOne({ where: { name: name } });
    if (productExists) {
      return res.status(400).json({ error: "Product already exists" });
    }
    const product = await db.Product.create({
      name: name,
      description: description,
      quantity: quantity,
      limit: limit,
    });
    return res.status(201).json(product);
  } catch (error) {
    return res.status(500).json({ error: "Failed to create product" }, error);
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
      return res.status(400).json({
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
      return res.status(400).json({
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
const rankArticleProductUsage = async (req, res) => {
  try {
    const { id } = req.params;
    const { period } = req.body;
    const products = await db.BranchProduct.findAll({
      where: { branch_id: id },
    });
    if (!products) {
      return res
        .status(404)
        .json({ error: "No Products found for the branch" });
    }
    // console.log(product);
    let totalUsage = 0;
    if (period === "week") {
      for (let product of products) {
        totalUsage += await getProductUsageWeek(parseInt(product.product_id))
          .usage;
        console.log(totalUsage);
      }
    } else if (period === "month") {
      for (let i = 0; i < product.length; i++) {
        totalUsage += getProductUsageMonth(product[i].product_id).usage;
      }
    } else {
      return res.status(400).json({ error: "Invalid period" });
    }
    return res.status(200).json({ branch_id: id, usage: totalUsage });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

async function getProductUsageWeek(id) {
  try {
    const product = await db.Product.findOne({ where: { product_id: id } });
    if (!product) {
      return { error: "Product not found" };
    }
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
    console.log(sevenDaysAgo);
    const internalCommands = await db.InternalOrder.findAll({
      where: {
        createdAt: {
          [Op.gte]: sevenDaysAgo,
        },
      },
    });

    let usageTotal = 0;
    for (let command of internalCommands) {
      const product = await db.Product_Command.findOne({
        where: {
          product_id: id,
          command_id: command.command_id,
          createdAt: {
            [Op.gte]: sevenDaysAgo,
          },
        },
        order: [["createdAt", "DESC"]],
      });
      if (product) {
        usageTotal += product.delivered_amount;
      }
    }
    return usageTotal;
  } catch (error) {
    return { error: error.message };
  }
}
async function getProductUsageMonth(id) {
  try {
    const product = await db.Product.findOne({ where: { product_id: id } });
    if (!product) {
      return { error: "Product not found" };
    }
    const oneMonthAgo = new Date();
    oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);
    const internalCommands = await db.InternalOrder.findAll({
      where: {
        createdAt: {
          [Op.gte]: oneMonthAgo,
        },
      },
    });

    let usageTotal = 0;
    for (let command of internalCommands) {
      const product = await db.Product_Command.findOne({
        where: {
          product_id: id,
          command_id: command.command_id,
          createdAt: {
            [Op.gte]: oneMonthAgo,
          },
        },
        order: [["createdAt", "DESC"]],
      });
      if (product) {
        usageTotal += product.delivered_amount;
      }
    }
    return { productid: id, usage: usageTotal };
  } catch (error) {
    return { error: error.message };
  }
}
const returnProductUsageMonth = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await db.Product.findOne({ where: { product_id: id } });
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }
    const oneMonthAgo = new Date();
    oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);
    const internalCommands = await db.InternalOrder.findAll({
      where: {
        createdAt: {
          [Op.gte]: oneMonthAgo,
        },
      },
    });

    let usageTotal = 0;
    for (let command of internalCommands) {
      const product = await db.Product_Command.findOne({
        where: {
          product_id: id,
          command_id: command.command_id,
          createdAt: {
            [Op.gte]: oneMonthAgo,
          },
        },
        order: [["createdAt", "DESC"]],
      });
      if (product) {
        usageTotal += product.delivered_amount;
      }
    }
    return res.status(200).json({ productid: id, usage: usageTotal });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
const returnProductUsageWeek = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await db.Product.findOne({ where: { product_id: id } });
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }
    const oneMonthAgo = new Date();
    oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);
    const internalCommands = await db.InternalOrder.findAll({
      where: {
        createdAt: {
          [Op.gte]: oneMonthAgo,
        },
      },
    });

    let usageTotal = 0;
    for (let command of internalCommands) {
      const product = await db.Product_Command.findOne({
        where: {
          product_id: id,
          command_id: command.command_id,
          createdAt: {
            [Op.gte]: oneMonthAgo,
          },
        },
        order: [["createdAt", "DESC"]],
      });
      if (product) {
        usageTotal += product.delivered_amount;
      }
    }
    return res.status(200).json({ productid: id, usage: usageTotal });
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
  rankArticleProductUsage,
  returnProductUsageMonth,
  getProductUsageWeek,
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

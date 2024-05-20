// const Product = require('../Models/Product');
const { Op } = require("sequelize");
const db = require("../models");
const internal = require("stream");
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
    //id : branch_id
    const { id, period } = req.params;
    const products = await db.BranchProduct.findAll({
      where: { branch_id: id },
    });
    if (!products) {
      return res
        .status(404)
        .json({ error: "No Products found for the branch" });
    }
    let totalUsage = 0;
    if (period === "week") {
      for (let product of products) {
        totalUsage += await getProductUsageWeek(parseInt(product.product_id));
        console.log(totalUsage);
      }
    } else if (period === "month") {
      for (let i = 0; i < products.length; i++) {
        totalUsage += (await getProductUsageMonth(products[i].product_id)).usage;
      }
    } else if (period === "six") {
      for (let i = 0; i < products.length; i++) {
        totalUsage += (await getProductUsageSixMonth(products[i].product_id)).usage;
      }
    } else if (period === "nine") {
      for (let i = 0; i < products.length; i++) {
        totalUsage += (await getProductUsageNineMonth(products[i].product_id)).usage;
      }
    } else if (period === "year") {
      for (let i = 0; i < products.length; i++) {
        totalUsage += (await getProductUsageYear(products[i].product_id)).usage;
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
      const products = await db.Product_Command.findAll({
        where: {
          product_id: id,
          command_id: command.command_id,
          createdAt: {
            [Op.gte]: sevenDaysAgo,
          },
        },
      });
      if (products) {
        for (let product of products) {
          usageTotal += product.delivered_amount;
        }
      } else {
        console.log("no products found");
      }
    }
    console.log(usageTotal);
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
      const products = await db.Product_Command.findAll({
        where: {
          product_id: id,
          command_id: command.command_id,
          createdAt: {
            [Op.gte]: oneMonthAgo,
          },
        },
      });
      if (products) {
        for (let product of products) {
          usageTotal += product.delivered_amount;
          console.log(usageTotal)
        }
      }
    }
    return { productid: id, usage: usageTotal };
  } catch (error) {
    return { error: error.message };
  }
}
async function getProductUsageSixMonth(id) {
  try {
    const product = await db.Product.findOne({ where: { product_id: id } });
    if (!product) {
      return { error: "Product not found" };
    }
    const sixMonthAgo = new Date();
    sixMonthAgo.setMonth(sixMonthAgo.getMonth() - 6);
    const internalCommands = await db.InternalOrder.findAll({
      where: {
        createdAt: {
          [Op.gte]: sixMonthAgo,
        },
      },
    });
    let usageTotal = 0;
    for (let command of internalCommands) {
      const products = await db.Product_Command.findAll({
        where: {
          product_id: id,
          command_id: command.command_id,
          createdAt: {
            [Op.gte]: sixMonthAgo,
          },
        },
      });
      if (products) {
        for (let product of products) {
          usageTotal += product.delivered_amount;
          console.log(usageTotal)
        }
      }
    }
    return { productid: id, usage: usageTotal };
  } catch (error) {
    return { error: error.message };
  }
}

async function getProductUsageNineMonth(id) {
  try {
    const product = await db.Product.findOne({ where: { product_id: id } });
    if (!product) {
      return { error: "Product not found" };
    }
    const nineMonthAgo = new Date();
    nineMonthAgo.setMonth(nineMonthAgo.getMonth() - 9);
    const internalCommands = await db.InternalOrder.findAll({
      where: {
        createdAt: {
          [Op.gte]: nineMonthAgo,
        },
      },
    });

    let usageTotal = 0;
    for (let command of internalCommands) {
      const products = await db.Product_Command.findAll({
        where: {
          product_id: id,
          command_id: command.command_id,
          createdAt: {
            [Op.gte]: nineMonthAgo,
          },
        },
      });
      if (products) {
        for (let product of products) {
          usageTotal += product.delivered_amount;
          console.log(usageTotal)
        }
      }
    }
    return { productid: id, usage: usageTotal };
  } catch (error) {
    return { error: error.message };
  }
}

async function getProductUsageYear(id) {
  try {
    const product = await db.Product.findOne({ where: { product_id: id } });
    if (!product) {
      return { error: "Product not found" };
    }
    const yearAgo = new Date();
    yearAgo.setMonth(yearAgo.getMonth() - 12);
    console.log(yearAgo);
    const internalCommands = await db.InternalOrder.findAll({
      where: {
        createdAt: {
          [Op.gte]: yearAgo,
        },
      },
    });
   
    let usageTotal = 0;
    for (let command of internalCommands) {
     
      const products = await db.Product_Command.findAll({
        where: {
          product_id: id,
          command_id: command.command_id,
          createdAt: {
            [Op.gte]: yearAgo,
          },
        },
      });
      if (products) {
        for (let product of products) {
          usageTotal += product.delivered_amount;
          console.log(usageTotal)
        }
      }
    }
    console.log(usageTotal)

    return { productid: id, usage: usageTotal };
  } catch (error) {
    return { error: error.message };
  }
}

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

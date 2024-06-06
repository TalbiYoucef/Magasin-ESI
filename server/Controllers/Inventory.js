const { Op } = require("sequelize");
const db = require("../models");
async function getProductEntry(id) {
  const product = await db.Product.findOne({ where: { product_id: id } });
  // get branch id
  const branch_ids = await db.BranchProduct.findAll({
    where: {
      product_id: id,
    },
  });
  if(branch_ids.length == 0){
    return null;
  }
  let totalEntry = 0;
  const commandOccurences = await db.PurchasingOrder.findAll({
    where: { branch_id: branch_ids[0].branch_id },
  });
  const yearAgo = new Date();
  yearAgo.setMonth(yearAgo.getMonth() - 12);
  for (let command of commandOccurences) {
    const productEntry = await db.Product_Command.findOne({
      where: {
        command_id: command.command_id,
        product_id: product.product_id,
        createdAt: {
          [Op.gte]: yearAgo,
        },
      },
      order: [["createdAt", "DESC"]],
      limit: 1,
    });
    if (productEntry) {
      totalEntry += productEntry.delivered_amount;
    }
  }
  return totalEntry;
}
async function getRestProduct(id) {
  const product = await db.Product.findOne({ where: { product_id: id } });
  if (!product) {
    return "product not found";
  }
  const productEntryTotal = await getProductEntry(product.product_id);
  return productEntryTotal - product.quantity;
}

async function getEntryProduct(id) {
  const product = await db.Product.findOne({ where: { product_id: id } });
  if (!product) {
    return "product not found";
  }
  const entry = await getProductEntry(id);
  return entry;
}

async function getExitProduct(id) {
  const product = await db.Product.findOne({ where: { product_id: id } });
  if (!product) {
    return "product not found";
  }
  let totalExit = 0;
  const Commands = await db.Command.findAll({ where: { type: `internal` } });
  for (let command of Commands) {
    const productExit = await db.Product_Command.findOne({
      where: {
        command_id: command.command_id,
        product_id: id,
        status_quantity: `satisfied`,
      },
    });
    if (productExit) {
      totalExit += productExit.delivered_amount;
    }
  }
  return totalExit;
}

async function getLogicalQuantity(id) {
  const product = await db.Product.findOne({ where: { product_id: id } });
  if (!product) {
    return "product not found";
  }
  return product.quantity;
}

const getInfoFicheProduct = async (req, res) => {
  const { id } = req.params;
  const product = await db.Product.findOne({ where: { product_id: id } });
  if (!product) {
    return res.status(404).send("product not found");
  }
  const entry = await getEntryProduct(id);
  const exit = await getExitProduct(id);
  const logicalQuantity = await getLogicalQuantity(id);
  const rest = await getRestProduct(id);
  if(!entry){
   return res.status(500).json('no entry for this product!')
  }
  res.status(200).json({
    product_id: product.product_id,
    rest: rest,
    entryTotal: entry,
    exitTotal: exit,
    logicalQuantity: logicalQuantity,
  });
};
module.exports = { getInfoFicheProduct };

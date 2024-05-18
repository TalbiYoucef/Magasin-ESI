const { where } = require("sequelize");
const db = require("../models");

const getCommands = async (req, res) => {
  try {
    const commands = await db.Command.findAll();
    if (!commands || commands.length === 0) {
      return res.status(404).json({ message: "No commands found" });
    }
    return res.status(200).json(commands);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const getExternalCommands = async (req, res) => {
  try {
    const commands = await db.Command.findAll({
      where: {
        type: "external",
      },
    });
    if (!commands || commands.length === 0) {
      return res.status(404).json({ message: "No commands found" });
    }
    return res.status(200).json(commands);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const getCommandById = async (req, res) => {
  try {
    const { id } = req.params;
    const command = await db.Command.findOne({ where: { command_id: id } });
    if (command) {
      return res.status(200).json(command);
    }
    return res.status(404).send("Command with the specified ID does not exist");
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

const createCommand = async (req, res) => {
  try {
    const { user_id, type } = req.body;
    const command = await db.Command.create({ user_id: user_id, type: type });
    return res.status(201).json(command);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const deleteCommand = async (req, res) => {
  try {
    const { id } = req.params;
    const command = await db.Command.findOne({ where: { command_id: id } });
    if (!command) {
      return res.status(404).json({ message: "Command not found" });
    }
    const commandProduct = await db.Product_Command.findAll({
      where: { command_id: id },
    });
    if (commandProduct) {
      await db.Product_Command.destroy({ where: { command_id: id } });
    }
    await db.Command.destroy({
      where: { command_id: id },
    });
    return res.status(200).json({ message: "Command deleted" });
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};
const getAllCommandProducts = async (req, res) => {
  try {
    let products = [];
    const { id,status } = req.params;
    const commandProducts = await db.Product_Command.findAll({
      where: { command_id: id ,status_quantity:status},
    });
    if (!commandProducts || commandProducts.length === 0) {
      return res.status(404).json({ message: "Command or products not found" });
    }

    for (const commandProduct of commandProducts) {
      products.push(commandProduct);
    }
    if (!products || products.length === 0) {
      return res.status(404).json({ message: "No products found" });
    }
    return res.status(200).json(products);
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};
const assignProductToCommand = async (req, res) => {
  try {
    const { id } = req.params;
    const { product_id, quantity,status_quantity, unit_price, num_inventaire } = req.body;
    const createdProductCommand = await db.Product_Command.create({
      command_id: id,
      product_id: product_id,
      unit_price: unit_price,
      quantity: quantity,
      delivered_amount: 0,
      amount_left: quantity,
      num_inventaire: num_inventaire,
      status_quantity: status_quantity
    });
    return res.status(201).json(createdProductCommand);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "an error has occured" });
  }
};
const updateProductToCommand = async (req, res) => {
  try {
    const { id } = req.params;
    const { product_id, delivered_amount, amount_left } = req.body;
    const productCommand = await db.Product_Command.findOne({
      where: { command_id: id, product_id: product_id },
    });
    if (productCommand) {
      productCommand.delivered_amount = delivered_amount;
      productCommand.amount_left = amount_left;
      await productCommand.save();
    } else {
      return res.status(400).json({ message: "Product not found" });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "an error has occured" });
  }
};

const getServiceCommands = async (req, res) => {
  try {
    const { service_id } = req.params;

    // Fetching user IDs of the service
    const users = await db.User.findAll({
      where: {
        service_id: service_id,
      },
      attributes: ["user_id"],
    });

    // Extracting user IDs from the fetched data
    const userIds = users.map((user) => user.user_id);

    // Fetching internal commands associated with the user IDs and their associated internal orders
    const internalCommands = await db.Command.findAll({
      where: {
        user_id: userIds,
        type: "internal", // Filter by internal type
      },
      include: {
        model: db.InternalOrder,
        where: {
          status: "initialized", // Filter by the status of the associated InternalOrder
        },
      },
    });

    res.json(internalCommands);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const removeProductFromCommand = async (req, res) => {
  try {
    const { id } = req.params;
    const { product_id } = req.body;
    const productCommand = await db.Product_Command.findOne({
      where: { command_id: id, product_id: product_id },
    });
    if (!productCommand) {
      return res.status(404).json({ message: "Product not found in command" });
    }
    await db.Product_Command.destroy({
      where: { command_id: id, product_id: product_id },
    });
    return res.status(200).json({ message: "Product removed from command" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
const getPurchasingOrder = async (req, res) => {
  const { id } = req.params;
  await db.PurchasingOrder.findOne({
    where: { command_id: id },
  })
    .then((order) => {
      if (!order) {
        res.status(500).send("no purshasing orders found");
      } else {
        res.status(200).send({ order });
      }
    })
    .catch((error) => {
      res.status(500).send("no purshasing orders found");
    });
};
const updateQuantities = async (req, res) => {
  const { id } = req.params;
  const {quantities,status} = req.body;
  console.log(quantities,status);

  // gerer les deux cas separement
  try {
    const result = quantities.map(async (quantity) => {
      const productCommand = await db.Product_Command.findOne({
        where: { command_id: id, product_id: quantity.product , status_quantity:quantity.status},
      });
      const command = await db.Command.findOne({
        where: { command_id: id },
      });

      if (productCommand) {
        if (command.type === "external" && status !== "edit") {
        productCommand.delivered_amount = quantity.quantity;
        productCommand.amount_left =
            productCommand.amount_left - quantity.quantity;
        }
        else{
          productCommand.quantity = quantity.quantity
        }
        await productCommand.save();
        return productCommand;
      } else {
        return { message: "Product not found" };
      }
    });
    res.status(200).json({ result });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error });
  }
};

const getInteranlOrder = async (req, res) => {
  const { id } = req.params;
  await db.InternalOrder.findOne({
    where: { command_id: id },
  })
    .then((order) => {
      if (!order) {
        res.status(500).send("no internal orders found");
      } else {
        res.status(200).send(order);
      }
    })
    .catch((error) => {
      res.status(500).send("no internal orders found");
    });
};
module.exports = {
  getCommands,
  getPurchasingOrder,
  getCommandById,
  createCommand,
  deleteCommand,
  assignProductToCommand,
  removeProductFromCommand,
  getAllCommandProducts,
  updateProductToCommand,
  getInteranlOrder,
  updateQuantities,
  getServiceCommands,
  getExternalCommands,
};

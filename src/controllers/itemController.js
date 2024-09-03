const Item = require('../models/Item');

exports.getAllItems = async (req, res) => {
  try {
    const items = await Item.findAll();
    res.json(items);
  } catch (err) {
    res.status(500).json({ error: 'Erro ao buscar itens' });
  }
};

exports.createItem = async (req, res) => {
  const { name, description } = req.body;
  try {
    const item = await Item.create({ name, description });
    res.status(201).json(item);
  } catch (err) {
    res.status(500).json({ error: 'Erro ao criar item' });
  }
};

exports.updateItem = async (req, res) => {
  const { id } = req.params;
  const { name, description } = req.body;
  try {
    const item = await Item.findByPk(id);
    if (!item) {
      return res.status(404).json({ error: 'Item não encontrado' });
    }
    item.name = name;
    item.description = description;
    await item.save();
    res.json(item);
  } catch (err) {
    res.status(500).json({ error: 'Erro ao atualizar item' });
  }
};

exports.deleteItem = async (req, res) => {
  const { id } = req.params;
  try {
    const item = await Item.findByPk(id);
    if (!item) {
      return res.status(404).json({ error: 'Item não encontrado' });
    }
    await item.destroy();
    res.json({ message: 'Item removido com sucesso!' });
  } catch (err) {
    res.status(500).json({ error: 'Erro ao deletar item' });
  }
};

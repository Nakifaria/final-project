const route = require('express').Router();

const { Item, Category } = require('../../db/models');

route.get('/', async (req, res) => {
  try {
    const items = (
      await Category.findAll({
        include: {
          model: Item,
        },
        attributes: ['id', 'title'],
      })
    ).map((el) => el.get({ plain: true }));

    res.json({ items });
  } catch (error) {
    res.json({ msg: error.toString() });
  }
});

module.exports = route;

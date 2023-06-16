const router = require('express').Router();

const {
    Favourite,
    Item
  } = require('../../db/models');

  router.get('/', async (req, res) => {
    try {
      const items = (
        await Favourite.findAll({
          include: {
            model: Item,
          },
          attributes: ['id'],
        })
      ).map((el) => el.get({ plain: true }));
  
      res.json([...items]);
    } catch (error) {
      res.json({ msg: error.toString() });
    }
  });

  module.exports = router;
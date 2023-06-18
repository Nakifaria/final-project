const router = require('express').Router();

const {
    Favourite,
    Item,
    Cart,
    CartItem,
  } = require('../../db/models');

  router.get('/', async (req, res) => {
    try {
      const items = (
        await Favourite.findAll( {
          include: {model: Item},
          attributes: ['id'],
        })
      ).map((el) => el.get({ plain: true }));
      res.json([...items]);
    } catch (error) {
      res.json({ msg: error.toString() });
    }
  });

  router.delete('/:id', async (req, res) => {
    try {
      await Favourite.destroy({ where: { id: req.params.id } });
      res.sendStatus(200);
    } catch (error) {
      res.render(Error, { msg: error.message });
    }
  });

  router.put('/:id', async (req, res) => {
    try {
      const item = await Favourite.findOne({ where: { id: req.params.id }});
      const realItem = await Item.findOne({ where: { id: item.item_id} })
      /* await CartItem.create({where: { user: req.session.user}}) */
      await CartItem.create({card_id: 1, item_id: item.item_id, count: 1})
    } catch (error) {
      console.log(error);
    }
  })



  module.exports = router;
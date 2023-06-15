const router = require('express').Router();

const {
    Favourite,
    Item
  } = require('../../db/models');

  router.get('/', async (req, res) => {
    try {
      const favoritesData = await Item.findAll({
        limit: 10
    /*     where: { user: req.session.user.id }, */
      });
      const favorites = await favoritesData.map((el) =>
        el.get({ plain: true })
      );
      res.json(favorites)
    } catch (error) {
      res.json(error.message);
    }
  });

  module.exports = router;
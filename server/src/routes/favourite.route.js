const router = require('express').Router();

const { Favourite } = require('../../db/models');

router.get('/:userId', async (req, res) => {
  const { userId } = req.params;

  try {
    const userItems = (
      await Favourite.findAll({
        where: { user_id: userId },
      })
    )
      .map((el) => el.get({ plain: true }))
      .map((el) => el.item_id);

    res.json({ settedItems: true, userItems });
  } catch (error) {
    res.json({ settedItems: false, msg: error.toString() });
  }
});

router.post('/', async (req, res) => {
  const { userId, itemId } = req.body;

  try {
    await Favourite.create({ user_id: userId, item_id: itemId });

    res.json({ settedItems: true });
  } catch (error) {
    res.json({ settedItems: false, msg: error.toString() });
  }
});

router.delete('/', async (req, res) => {
  const { userId, itemId } = req.body;

  try {
    await Favourite.destroy({ where: { user_id: userId, item_id: itemId } });

    res.json({ settedItems: true });
  } catch (error) {
    res.json({ settedItems: false, msg: error.toString() });
  }
});

module.exports = router;

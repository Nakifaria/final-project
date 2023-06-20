const router = require('express').Router();

const { CartItem, Cart } = require('../../db/models');

router.get('/:userId', async (req, res) => {
  const { userId } = req.params;

  try {
    const userItems = (
      await Cart.findOne({
        where: { user_id: userId, ordered: false },
        include: CartItem,
      })
    )
      .get({ plain: true })
      .CartItems.map((el) => el.id);

    console.log(userItems);

    res.json({ settedItems: true, userItems });
  } catch (error) {
    res.json({ settedItems: false, msg: error.toString() });
    console.log(error);
  }
});

router.post('/', async (req, res) => {
  const { userId, itemId, cartId } = req.body;

  try {
    await CartItem.create({ cart_id: cartId, item_id: itemId });

    res.json({ settedItems: true });
  } catch (error) {
    res.json({ settedItems: false, msg: error.toString() });
  }
});

router.delete('/', async (req, res) => {
  const { userId, itemId, cartId } = req.body;

  try {
    await CartItem.destroy({ where: { cart_id: cartId, item_id: itemId } });

    res.json({ settedItems: true });
  } catch (error) {
    res.json({ settedItems: false, msg: error.toString() });
  }
});

module.exports = router;

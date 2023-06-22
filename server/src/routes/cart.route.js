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
      .CartItems.map((el) => {
        return { id: el.item_id, count: el.count };
      });

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

router.patch('/:action', async (req, res) => {
  const { itemId, cartId } = req.body;

  const { action } = req.params;

  try {
    const itemToUpdate = await CartItem.findOne({
      where: { item_id: itemId, cart_id: cartId },
    });

    if (action === 'increment') {
      await itemToUpdate.increment('count');
    } else if (action === 'decrement') {
      await itemToUpdate.decrement('count');
    }
    res.json({ settedItems: false });
  } catch (error) {
    res.json({ settedItems: false, msg: error.toString() });
  }
});

module.exports = router;

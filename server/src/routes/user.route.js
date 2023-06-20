const router = require('express').Router();

const bcrypt = require('bcrypt');

const { User, Cart } = require('../../db/models');

router.get('/', (req, res) => {
  if (req.session.user) {
    res.json({ session: true, user: req.session.user });
  } else {
    res.json({ session: false, user: null });
  }
});

router.get('/logout', (req, res) => {
  req.session.destroy(() => {
    res.clearCookie('authCookie');
    res.json({ logout: true });
  });
});

router.post('/login', async (req, res) => {
  const { email, name, password } = req.body;

  try {
    const user = await User.findOne({ where: { email } });

    if (user) {
      const clearPass = await bcrypt.compare(password, user.password);

      if (clearPass) {
        const newCart = await Cart.create({ user_id: user.id });

        req.session.user = { email, name, id: user.id, cartId: newCart.id };

        res.json({
          auth: true,
          userInfo: {
            id: user.id,
            name: user.name,
            email: user.email,
            cartId: newCart.id,
          },
        });
      } else {
        res.json({ auth: false, msg: 'неверный пароль' });
      }
    } else {
      res.json({ auth: false, msg: 'пользователь не найден' });
    }
  } catch (error) {
    console.log(error);
    res.json({ auth: false, msg: error.toString() });
  }
});

router.post('/registration', async (req, res) => {
  const { email, name, password } = req.body;

  try {
    const hashPass = await bcrypt.hash(password, 10);

    const [user, created] = await User.findOrCreate({
      where: { email },
      defaults: { email, name, password: hashPass },
    });

    if (created) {
      const newCart = await Cart.create({ user_id: user.id });

      req.session.user = { email, name, id: user.id, cartId: newCart.id };

      res.json({
        auth: true,
        userInfo: {
          id: user.id,
          name: user.name,
          email: user.email,
          cartId: newCart.id,
        },
      });
    } else {
      res.json({
        auth: false,
        msg: 'пользователь с такой почтой уже зарегистрирован',
      });
    }
  } catch (error) {
    console.log(error);
    res.json({ auth: false, msg: error.toString() });
  }
});

module.exports = router;

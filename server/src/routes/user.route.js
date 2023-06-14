const router = require('express').Router();

const bcrypt = require('bcrypt');

const {
  User,
  Comparison,
  Configuration,
  Favourite,
  Cart,
} = require('../../db/models');

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
        req.session.user = { login, id: user.id };

        res.json({ auth: true, msg: user.id });
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
  const { login, password } = req.body;

  try {
    const hashPass = await bcrypt.hash(password, 10);

    const [user, created] = await User.findOrCreate({
      where: { login },
      defaults: { login, password: hashPass },
    });

    if (created) {
      req.session.user = { login, id: user.id };

      await Comparison.create({ user_id: user.id });
      await Configuration.create({ user_id: user.id });
      await Favourite.create({ user_id: user.id });
      await Cart.create({ user_id: user.id });

      res.json({ auth: true, msg: user.id });
    } else {
      res.json({ auth: false, msg: 'пользователь с таким именем существует' });
    }
  } catch (error) {
    console.log(error);
    res.json({ auth: false, msg: error.toString() });
  }
});

module.exports = router;

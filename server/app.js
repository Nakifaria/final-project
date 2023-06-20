require('dotenv').config();
require('@babel/register');

const session = require('express-session');
const FileStore = require('session-file-store')(session);

const express = require('express');
const cors = require('cors');
const path = require('path');

const dbCheck = require('./src/middlewares/dbCheck');

// Require routes

const userRoute = require('./src/routes/user.route');
const catalogRoute = require('./src/routes/catalog.route');
const configuratorRoute = require('./src/routes/configurator.route');
const favouriteRoute = require('./src/routes/favourite.route');
const compareRoute = require('./src/routes/compare.route');
const cartRoute = require('./src/routes/cart.route');
const itemRoute = require('./src/routes/items.route');

const app = express();
const PORT = process.env.PORT || 3002;

// Cookie
const sessionConfig = {
  name: 'authCookie',
  store: new FileStore(),
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 1000 * 86400,
    httpOnly: true,
  },
};

app.use(session(sessionConfig));
app.use(
  cors({
    origin: ['http://localhost:5173'],
    credentials: true,
  })
);

app.use(express.static(path.join(process.cwd(), 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(dbCheck);

// Routes

app.use('/user', userRoute);
app.use('/configurator', configuratorRoute);
app.use('/catalog', catalogRoute);
app.use('/favourite', favouriteRoute);
app.use('/compare', compareRoute);
app.use('/cart', cartRoute);
app.use('/items', itemRoute);

app.listen(PORT, () => {
  console.log(`Server started at ${PORT}`);
});

require('dotenv').config();
require('@babel/register');

const session = require('express-session');
const FileStore = require('session-file-store')(session);

const express = require('express');
const cors = require('cors');

const dbCheck = require('./src/middlewares/dbCheck');

// Require routes

const userRoute = require('./src/routes/user.route');
const noteRoute = require('./src/routes/note.route');
const nbRoute = require('./src/routes/nb.route');

const app = express();
const PORT = process.env.PORT || 3001;

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
    origin: ['http://localhost:3001'],
    credentials: true,
  })
);

app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(dbCheck);

// Routes

app.use('/user', userRoute);
app.use('/note', noteRoute);
app.use('/notebook', nbRoute);

app.listen(PORT, () => {
  console.log(`Server started at ${PORT}`);
});
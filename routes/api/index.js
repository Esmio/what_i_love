const express = require('express');

const router = express.Router();

const userRouter = require('./user');

router.get('/login', (req, res, next) => {
  const { username } = req.query;
  req.session.user = { username };
  res.send('done');
});

router.get('/hello', (req, res, next) => {
  const { username } = req.session.user;
  res.send(`<h1>hello, ${username}</h1>`);
});

router.use('/user', userRouter);

/* GET home page. */
router.get('/', (req, res) => {
  res.render('index', { title: 'Hello Simon' });
});

module.exports = router;

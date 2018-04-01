const express = require('express');
const JWT = require('jsonwebtoken');

const router = express.Router();

const userRouter = require('./user');

const crypto = require('crypto');

const pbkdf2Async = require('bluebird').promisify(crypto.pbkdf2);

const User = require('../../models/mongoose/user');
/*
router.post('/login', (req, res, next) => {
  (async () => {
    const { username, password } = req.body;
    const cipher = await pbkdf2Async(password, 'dafdfdafdfasf', 10000, 512, 'sha256');
    const created = User.insert({ username, password: cipher }).then();
    res.send(created);    
  })()
    .then((r) => {
      console.log(r);
    })
    .catch((e) => {
      console.log(e);
    });
});

router.get('/hello', (req, res, next) => {
  const auth = req.get('Authorization');
  if (!auth) res.send('no auth');
  if (auth.indexOf('Bearer ') === -1) res.send('no auth');
  const token = auth.split('Bearer ')[1];
  const user = JWT.verify(token, 'dafdfdafdfasf');
  if (user.expireAt < Date.now().valueOf()) res.send('au expired');
  res.send(user);
});
*/

router.get('/login', (req, res, next) => {
  req.session.user = { username: req.query.username };
  req.session.save();
  res.send(req.session);
});

router.get('/hello', (req, res, next) => {
  console.log(req.session);
  res.send(`hello,${req.session.user.username}`);
});

router.use('/user', userRouter);

module.exports = router;

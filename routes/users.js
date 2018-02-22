const express = require('express');

const router = express.Router();

const UserService = require('../services/user_service');

/* GET users listing. */
router.get('/', (req, res) => {
  (async () => {
    const users = UserService.getAllUsers();
    res.locals.users = users;
    res.render('users');
  })()
    .then((r) => {
      console.log(r);
    })
    .catch((e) => {
      console.log(e);
    });
});

router.post('/', (req, res) => {
  const { firstName, lastName, age } = req.body;
  const u = UserService.addNewUser(firstName, lastName, age);
  res.json(u);
});

router.get('/:userId', (req, res) => {
  const user = UserService.getUserById(Number(req.params.userId));
  res.locals.user = user;
  res.render('user');
});

router.post('/:userId/subscription', (req, res, next) => {
  try {
    const sub = UserService.createSubscription(Number(req.params.userId), req.body.url);
    res.json(sub);
  } catch (e) {
    next(e);
  }
});

module.exports = router;

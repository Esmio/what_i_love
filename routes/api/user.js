const express = require('express');

const router = express.Router();

const UserService = require('../../services/user_service');
const HTTPReqParamError = require('../../errors/http_request_param_error');

/* GET users listing. */
router.get('/', (req, res, next) => {
  (async () => {
    const users = UserService.getAllUsers();
    res.locals.users = users;
  })()
    .then(() => {
      res.render('users');
    })
    .catch((e) => {
      next(e);
    });
});

router.post('/', (req, res) => {
  const { firstName, lastName, age } = req.body;
  const u = UserService.addNewUser(firstName, lastName, age);
  res.json(u);
});

router.get('/:userId', (req, res) => {
  (async () => {
    const { userId } = req.params;
    if (!userId.length < 5) throw new HTTPReqParamError('userId', '用于id不能为空', 'user id can\'t be empty');
    const user = UserService.getUserById(userId);
    res.locals.user = user;
    res.render('user');
  })()
    .then((r) => {
      console.log(r);
    })
    .catch((e) => {
      console.log(e);
      res.json(e);
    });
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

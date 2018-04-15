const express = require('express');

const router = express.Router();

const UserService = require('../../services/user_service');
const HTTPReqParamError = require('../../errors/http_request_param_error');
const apiRes = require('../../utils/api_response.js');
const auth = require('../../middlewares/auth');

/* GET users listing. */
router.get('/', (req, res, next) => {
  (async () => {
    const users = UserService.getAllUsers();
    // res.locals.users = users;
    return {
      users,
    };
  })()
    .then((r) => {
      res.data = r;
      apiRes(req, res);
    })
    .catch((e) => {
      next(e);
    });
});
// 创建新用户
router.post('/', (req, res, next) => {
  (async () => {
    const { username, password, name } = req.body;
    const result = await UserService.addNewUser({
      username,
      password,
      name,
    });
    return result;
  })()
    .then((r) => {
      res.data = r;
      apiRes(req, res);
    })
    .catch((e) => {
      next(e);
    });
});

router.get('/:userId', (req, res, next) => {
  (async () => {
    const { userId } = req.params;
    if (!userId) throw new HTTPReqParamError('userId', '用于id不能为空', 'user id can\'t be empty');
    const user = await UserService.getUserById(userId);
    return user;
  })()
    .then((r) => {
      res.data = r;
      apiRes(req, res);
    })
    .catch((e) => {
      next(e);
    });
});

router.post('/:userId/subscription', auth(), (req, res, next) => {
  (async () => {
    const sub = await UserService.createSubscription(Number(req.params.userId), req.body.url);
    return {
      sub,
    };
  })()
    .then((r) => {
      res.data = r;
      apiRes(req, res);
    })
    .catch((e) => {
      next(e);
    });
});

module.exports = router;

var express = require('express');
var router = express.Router();

const users = []
/* GET users listing. */
router.route('/', function(req, res, next) {
})
  .get((req, res, next)=>{
    res.json(users);
  })
  .post((req, res, next)=>{
    const user = req.body;
    users.push(user)
    res.json(user);
  })
;

module.exports = router;

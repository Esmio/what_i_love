const User = require('../models/mongoose/user');
const Subscription = require('../models/in_memo/subscription');

module.exports.getAllUsers = async () => User.list();

module.exports.addNewUser = async (name, age) => {
  const user = User.insert({
    name,
    age,
  });
  return user;
};

module.exports.getUserById = async userId => User.getOneById(userId);

module.exports.createSubscription = async (userId, url) => {
  const user = User.getOneById(userId);
  if (!user) throw Error('no such user!');
  const sub = Subscription.insert(userId, url);
  return sub;
};

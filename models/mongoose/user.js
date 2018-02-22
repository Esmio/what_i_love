const mongoose = require('mongoose');

const { Schema } = mongoose;

const UserSchema = new Schema({
  name: { type: String, required: true, index: 1 },
  age: { type: Number, min: 0, max: 120 },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
});

const UserModel = mongoose.model('user', UserSchema);

async function insert(user) {
  const u = await UserModel.create(user);
  return u;
}

async function getOneById(id) {
  const u = await UserModel.findOne({ _id: id });
  return u;
}

async function getOneByName(name) {
  const u = UserModel.findOne({ name });
  return u;
}

async function list(params) {
  const match = {};
  const flow = UserModel.find(match);
  const users = await flow.exec();
  return users;
}

module.exports = {
  insert,
  getOneById,
  getOneByName,
  list,
};

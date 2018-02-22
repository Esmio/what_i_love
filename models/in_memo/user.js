// 贫血模式

class User {
  constructor(firstName, lastName, age) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.age = age;
    this.id = User.id + 1;
  }

  getName() {
    return `${this.firstName} ${this.lastName}`;
  }

  static insert(firstName, lastName, age) {
    const u = new User(firstName, lastName, age);
    User.users.push(u);
    return u;
  }

  static getOneByName(name) {
    return User.users.find(u => u.name === name);
  }

  static getOneById(userId) {
    return User.users.find(u => u.id === userId);
  }

  static list() {
    return User.users;
  }

  // static get ['users']() {
  //   return users;
  // }
}

User.users = [];
User.id = 0;


module.exports = User;


const sql = require('./db.js');
const User = function (user) {
  this.first_name = user.first_name;
  this.last_name = user.last_name;
  this.email = user.email;
  this.password = user.password;
};

//findByEmail
User.findByEmail = (email, result) => {
  sql.query(`SELECT * FROM user WHERE email = '${email}'`, (err, res) => {
    if (err) {
      console.log('error: ', err);
      result(err, '');
      return;
    }

    if (res.length) {
      console.log('found user: ', res[0]);
      result('', res);
      return;
    }

    result('', '');
    return;
  });
};

User.create = (newUser, result) => {
  sql.query('INSERT INTO user SET ?', newUser, (err, res) => {
    if (err) {
      console.log('error: ', err);
      result(err, '');
      return;
    } else {
      result('', { id: res.insertId, ...newUser });
    }
  });
};

module.exports = User;

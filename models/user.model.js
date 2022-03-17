const sql = require('./db.js');
const User = function (user) {
  this.first_name = user.first_name;
  this.last_name = user.last_name;
  this.email = user.email;
  this.password = user.password;
  this.profilePicture = user.profilePicture;
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

User.getUserById = (id, result)=>{
  sql.query(`SELECT * FROM user WHERE id = ${id}`, (err,res)=>{
    if(err){
      result(err, "");
      return;
    }
    if(res.length){
      result("", res);
      return;
    }
    result("", "");
      return;
  })
}

User.updateUser = (id,updatedUser, result) => {
  sql.query(
    `UPDATE user SET  first_name='${updatedUser.first_name}',last_name='${updatedUser.last_name}',email='${updatedUser.email}' ,profilePicture='${updatedUser.profilePicture}' WHERE id='${id}'`,
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, "");
        return;
      }

      if (res.affectedRows === 1) {
        result("", { id: id, ...updatedUser });
        return;
      }

      result("", "");
      return;
    }
  );
};

//findOne
User.findOne = (email, result)=>{
  sql.query(`SELECT * FROM user WHERE email = '${email}'`, (err,res)=>{
    if(err){
      result(err, "");
      return;
    }
    if(res.length){
      result("", res);
      return;
    }
    result("", "");
      return;
  })
}

module.exports = User;

const sql = require('./db.js');
const UserAndMemberRelation = function (user) {
  this.userId = user.userId;
  this.accessCode = user.accessCode;
};

UserAndMemberRelation.create = (userId, memberId, result) => {
  memberId.forEach((element) => {
    sql.query(
      `INSERT INTO userandmemberrelation SET userId='${userId}', accessCode='${element}'`,
      (err, res) => {
        if (err) {
          console.log('error: ', err);
          result(err, '');
          return;
        } else {
          result('', result);
        }
      }
    );
  });
};

module.exports = UserAndMemberRelation;

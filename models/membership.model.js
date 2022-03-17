const sql = require('./db.js');

const Membership = function (membership) {
  this.membership_number = membership.membership_number;
  this.access_code = this.membership_number.access_code;
  this.email = membership.email;
};

Membership.getMembershipDetails = (email, result) => {
  sql.query(
    "SELECT membership_number,access_code FROM membership where email='" +
      email +
      "'",
    (err, res) => {
      if (err) {
        result(err, '');
        return;
      }

      if (res.length) {
        result('', res);
        return;
      }
      result('', '');
      return;
    }
  );
};

//getMembershipConfirmation
Membership.getMembershipConfirmation = (code, result) => {
  sql.query(
    "SELECT membership_number FROM membership where access_code='" + code + "'",
    (err, res) => {
      if (err) {
        result(err, '');
        return;
      }

      if (res.length) {
        result('', res);
        return;
      }
      result('', '');
      return;
    }
  );
};

module.exports = Membership;

const sql = require("./db.js");

const Physician = function (physician) {
  this.phy_type = physician.phy_type;
  this.first_name = physician.first_name;
  this.last_name = physician.last_name;
  this.email_address = physician.email_address;
  this.primary_phone = physician.primary_phone;
  this.fax = physician.fax;
  this.street_address = physician.street_address;
  this.adddress_2 = physician.adddress_2;
  this.city = physician.city;
  this.state = physician.state;
  this.zip_code = physician.zip_code;
  this.country = physician.country;
  this.primary_hospital = physician.primary_hospital;
  this.last_appoint_date = physician.last_appoint_date;
  this.next_appoint_date = physician.next_appoint_date;
  this.is_primary_physician = physician.is_primary_physician;
};

Physician.checkAvailability = (email_address, result) => {
  sql.query(
    `SELECT * FROM physician_and_therapists WHERE email_address = '${email_address}'`,
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, "");
        return;
      }

      if (res.length) {
        result("", res);
        return;
      }

      result("", "");
      return;
    }
  );
};

Physician.create = (newPhysician, result) => {
  sql.query(
    "INSERT INTO physician_and_therapists SET ?",
    newPhysician,
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, "");
        return;
      }
      result("", { id: res.insertId, ...newPhysician });
    }
  );
};

Physician.getAllPhysician = (result) => {
    sql.query("SELECT * FROM physician_and_therapists ", (err, res) => {
      if (err) {
        result(err, "");
        return;
      }

      if (res.length) {
        result("", res);
        return;
      }
      result("", "");
      return;
    });
  };

Physician.getPhysicianById = (id, result) => {
    sql.query(`SELECT * FROM physician_and_therapists WHERE id='${id}'`, (err, res) => {
      if (err) {
        console.log(err);
        result(err, "");
        return;
      }

      if (res.length) {
        result("", res);
        return;
      }
      result("", "");
      return;
    });
  };

Physician.update = (id, updatePhysician, result) => {
  sql.query(
    `UPDATE physician_and_therapists SET 
    phy_type='${updatePhysician.phy_type}', 
    first_name='${updatePhysician.first_name}', 
    last_name='${updatePhysician.last_name}', 
    email_address='${updatePhysician.email_address}', 
    primary_phone='${updatePhysician.primary_phone}', 
    fax='${updatePhysician.fax}', 
    street_address='${updatePhysician.street_address}', 
    adddress_2='${updatePhysician.adddress_2}', 
    city='${updatePhysician.city}',
    state='${updatePhysician.state}', 
    zip_code='${updatePhysician.zip_code}', 
    country='${updatePhysician.country}', 
    primary_hospital='${updatePhysician.primary_hospital}', 
    last_appoint_date='${updatePhysician.last_appoint_date}', 
    next_appoint_date='${updatePhysician.next_appoint_date}' 
    WHERE id='${id}'`,
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result("", err);
        return;
      }

      if (res.affectedRows === 1) {
        result("", { id: id, ...updatePhysician });
        return;
      }

      result("", "");
      return;
    }
  );
};


Physician.delete = (id, result) => {
    sql.query(`DELETE FROM physician_and_therapists WHERE id ='${id}'`, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, "");
        return;
      }

      if (res) {
        result("", res);
        return;
      }

      result("", "");
    });
  };

module.exports = Physician;

const sql = require("./db.js");

const PrescriptionMedication = function (prescriptionMedication) {
    (this.prescription_number = prescriptionMedication.prescription_number),
    (this.medication_type = prescriptionMedication.medication_type),
    (this.medication_name = prescriptionMedication.medication_name),
    (this.dosage = prescriptionMedication.dosage),
    (this.frequency = prescriptionMedication.frequency),
    (this.start_date = prescriptionMedication.start_date),
    (this.duration = prescriptionMedication.duration),
    (this.reason_for_use = prescriptionMedication.reason_for_use),
    (this.pharmacy_name = prescriptionMedication.pharmacy_name),
    (this.pharmacy_phone = prescriptionMedication.pharmacy_phone),
    (this.physician_name = prescriptionMedication.physician_name),
    (this.physician_id = prescriptionMedication.physician_id)

};

PrescriptionMedication.create = (newPrescriptionMedication, result) => {
  sql.query(
    "INSERT INTO prescription_and_medication SET ?",
    newPrescriptionMedication,
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, "");
        return;
      }
      result("", { id: res.insertId, ...newPrescriptionMedication });
    }
  );
};

PrescriptionMedication.getAllPrescriptionMedication = (result) => {
  sql.query("SELECT * FROM prescription_and_medication ", (err, res) => {
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

PrescriptionMedication.getPrescriptionMedicationById = (id, result) => {
  sql.query(
    `SELECT * FROM prescription_and_medication WHERE id='${id}'`,
    (err, res) => {
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
    }
  );
};

PrescriptionMedication.update = (id, updatePrescriptionMedication, result) => {
  sql.query(
    `UPDATE prescription_and_medication SET 
    prescription_number='${updatePrescriptionMedication.prescription_number}', 
    medication_type='${updatePrescriptionMedication.medication_type}', 
    medication_name='${updatePrescriptionMedication.medication_name}',
    dosage='${updatePrescriptionMedication.dosage}', 
    frequency='${updatePrescriptionMedication.frequency}', 
    start_date='${updatePrescriptionMedication.start_date}',
    duration='${updatePrescriptionMedication.duration}', 
    reason_for_use='${updatePrescriptionMedication.reason_for_use}', 
    pharmacy_name='${updatePrescriptionMedication.pharmacy_name}',
    pharmacy_phone='${updatePrescriptionMedication.pharmacy_phone}', 
    physician_name='${updatePrescriptionMedication.physician_name}', 
    physician_id='${updatePrescriptionMedication.physician_id}'    
    WHERE id='${id}'`,
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result("", err);
        return;
      }

      if (res.affectedRows === 1) {
        result("", { id: id, ...updatePrescriptionMedication });
        return;
      }

      result("", "");
      return;
    }
  );
};

PrescriptionMedication.delete = (id, result) => {
  sql.query(
    `DELETE FROM prescription_and_medication WHERE id ='${id}'`,
    (err, res) => {
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
    }
  );
};

module.exports = PrescriptionMedication;

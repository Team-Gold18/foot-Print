const PrescriptionMedication = require("../models/prescriptionMedication.model");
const globalMessage = require("../error/errors.message");

exports.create = async function (req, res) {
  try {
    if (!req.body) {
      res.status(400).json({
        code: 400,
        status: "BadRequest",
        message: "Content can not be empty!",
      });
    }
    const newPrescriptionMedication = new PrescriptionMedication({
      prescription_number : req.body.prescription_number,
      medication_type : req.body.medication_type,
      medication_name : req.body.medication_name,
      dosage : req.body.dosage,
      frequency : req.body.frequency,
      start_date : req.body.start_date,
      duration : req.body.duration,
      reason_for_use : req.body.reason_for_use,
      pharmacy_name : req.body.pharmacy_name,
      pharmacy_phone : req.body.pharmacy_phone,
      physician_name : req.body.physician_name,
      physician_id : 1
    });
    PrescriptionMedication.create(newPrescriptionMedication, (err, data) => {
        if (err) {
          res.status(400).send({
            success: globalMessage.NotSuccess,
            code: globalMessage.ServerCode,
            status: globalMessage.SeverErrorMessage,
            message: err.message,
          });
        } else {
          res.status(200).json({
            success: globalMessage.Success,
            code: globalMessage.SuccessCode,
            status: globalMessage.SuccessStatus,
            data: data,
            message: globalMessage.CreateSuccessMessage,
          });
        }
      });

  } catch (err) {
    return res.status(400).json({
      success: globalMessage.NotSuccess,
      code: globalMessage.BadCode,
      status: globalMessage.BadMessage,
      message: err.message,
    });
  }
};

exports.getAllPrescriptionMedication = async function (req, res) {
  try {
    PrescriptionMedication.getAllPrescriptionMedication((err, data) => {
      if (err) {
        return res.status(500).send({
          success: globalMessage.NotSuccess,
          code: globalMessage.ServerCode,
          status: globalMessage.SeverErrorMessage,
          message: err.message,
        });
      }
      if (data.length) {
        return res.status(200).json({
          success: globalMessage.Success,
          code: globalMessage.SuccessCode,
          status: globalMessage.SuccessStatus,
          data: data,
          message: "List is received",
        });
      } else {
        return res.status(200).send({
          success: globalMessage.NotSuccess,
          code: globalMessage.ServerCode,
          status: globalMessage.SeverErrorMessage,
          data: data,
          message: "List is empty",
        });
      }
    });
  } catch (err) {
    return res.status(400).json({
      success: globalMessage.NotSuccess,
      code: globalMessage.BadCode,
      status: globalMessage.BadMessage,
      message: err.message,
    });
  }
};


exports.getPrescriptionMedicationById = async function (req, res) {
    try {
        PrescriptionMedication.getPrescriptionMedicationById(req.params.id, (err, data) => {
        if (err) {
          return res.status(400).json({
            success: globalMessage.NotSuccess,
            code: globalMessage.BadCode,
            status: globalMessage.BadMessage,
            message: err.message ,
          });
        }
        if (data.length) {
          return res.status(200).json({
            success: globalMessage.Success,
            code: globalMessage.SuccessCode,
            status: globalMessage.SuccessStatus,
            data: data,
            message: "Prescription and Medication is received",
          });
        } else {
          return res.status(200).json({
            success: globalMessage.NotSuccess,
            code: globalMessage.SuccessCode,
            status: globalMessage.SuccessStatus,
            data: data,
            message: "Prescription and Medication is not found",
          });
        }
      });
    } catch (err) {
      return res.status(400).json({
        success: globalMessage.NotSuccess,
        code: globalMessage.BadCode,
        status: globalMessage.BadMessage,
        message: err.message,
      });
    }
  };
  

exports.delete = async function (req, res) {
  try {
    PrescriptionMedication.delete(req.params.id, (err, data) => {
      if (err) {
        return res.status(500).send({
          success: globalMessage.NotSuccess,
          code: globalMessage.ServerCode,
          status: globalMessage.SeverErrorMessage,
          message: err.message,
        });
      }
      if (data.affectedRows === 1) {
        return res.status(200).json({
          success: globalMessage.Success,
          code: globalMessage.SuccessCode,
          status: globalMessage.SuccessStatus,
          message: "successfully deleted",
        });
      } else {
        return res.status(200).send({
          success: globalMessage.NotSuccess,
          code: globalMessage.SuccessCode,
          status: globalMessage.SuccessStatus,
          message: "Prescription and medication is not found",
        });
      }
    });
  } catch (err) {
    return res.status(400).json({
      success: globalMessage.NotSuccess,
      code: globalMessage.BadCode,
      status: globalMessage.BadMessage,
      message: err.message,
    });
  }
};
exports.update = async function (req, res) {
    try {
      if (!req.body) {
        res.status(400).json({
          code: 400,
          status: "BadRequest",
          message: "Content can not be empty!",
        });
      }
      const updatePrescriptionMedication = {
        prescription_number : req.body.prescription_number,
        medication_type : req.body.medication_type,
        medication_name : req.body.medication_name,
        dosage : req.body.dosage,
        frequency : req.body.frequency,
        start_date : req.body.start_date,
        duration : req.body.duration,
        reason_for_use : req.body.reason_for_use,
        pharmacy_name : req.body.pharmacy_name,
        pharmacy_phone : req.body.pharmacy_phone,
        physician_name : req.body.physician_name,
        physician_id : 1
      };
      PrescriptionMedication.update(req.params.id, updatePrescriptionMedication, (err, data) => {
          if (err) {
            return res.status(500).send({
              success: globalMessage.NotSuccess,
              code: globalMessage.ServerCode,
              status: globalMessage.SeverErrorMessage,
              message: err.message,
            });
          }
          if (data) {
            return res.status(200).json({
              success: globalMessage.Success,
              code: globalMessage.SuccessCode,
              status: globalMessage.SuccessStatus,
              data: data,
              message: "successfully Updated",
            });
          } else {
            return res.status(200).send({
              success: globalMessage.NotSuccess,
              code: globalMessage.ServerCode,
              status: globalMessage.SeverErrorMessage,
              data: data,
              message: "Prescription and Medication is not found",
            });
          }
        });
    } catch (err) {
      return res.status(400).json({
        success: globalMessage.NotSuccess,
        code: globalMessage.BadCode,
        status: globalMessage.BadMessage,
        message: err.message,
      });
    }
  };

  
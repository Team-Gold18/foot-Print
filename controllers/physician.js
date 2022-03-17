const Physician = require("../models/physician.model");
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
      const newPhysician = new Physician({
        phy_type: req.body.phy_type,
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        email_address: req.body.email_address,
        primary_phone: req.body.primary_phone,
        fax: req.body.fax,
        street_address: req.body.street_address,
        adddress_2: req.body.adddress_2,
        city: req.body.city,
        state: req.body.state,
        zip_code: req.body.zip_code,
        country: req.body.country,
        primary_hospital: req.body.primary_hospital,
        last_appoint_date: req.body.last_appoint_date,
        next_appoint_date: req.body.next_appoint_date,
        is_primary_physician: req.body.is_primary_physician
      });

      let email_address = req.body.email_address;
  
      Physician.checkAvailability(
        email_address,
        (err, data) => {
          if (err) {
            return res.status(400).json({
              success: globalMessage.NotSuccess,
              code: globalMessage.ServerCode,
              status: globalMessage.SeverErrorMessage,
              message: err.message,
            });
          }
          if (data && data.length) {
            return res.status(200).json({
              code: 200,
              success: false,
              message: `${email_address} is already exists`,
            });
          } else {
            Physician.create(newPhysician, (err, data) => {
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
                  Objective: data,
                  message: globalMessage.CreateSuccessMessage,
                });
              }
            });
          }
        }
      );
    } catch (err) {
      return res.status(400).json({
        success: globalMessage.NotSuccess,
        code: globalMessage.BadCode,
        status: globalMessage.BadMessage,
        message: err.message,
      });
    }
  };


  exports.getAllPhysician = async function (req, res) {
    try {
        Physician.getAllPhysician((err, data) => {
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
  
  
  exports.getPhysicianById = async function (req, res) {
      try {
        Physician.getPhysicianById(req.params.id, (err, data) => {
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
              message: "Physician is received",
            });
          } else {
            return res.status(200).json({
              success: globalMessage.NotSuccess,
              code: globalMessage.SuccessCode,
              status: globalMessage.SuccessStatus,
              data: data,
              message: "Physician is not found",
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
        Physician.delete(req.params.id, (err, data) => {
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
            message: "Physician is not found",
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
      const updatePhysician = {
        phy_type: req.body.phy_type,
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        email_address: req.body.email_address,
        primary_phone: req.body.primary_phone,
        fax: req.body.fax,
        street_address: req.body.street_address,
        adddress_2: req.body.adddress_2,
        city: req.body.city,
        state: req.body.state,
        zip_code: req.body.zip_code,
        country: req.body.country,
        primary_hospital: req.body.primary_hospital,
        last_appoint_date: req.body.last_appoint_date,
        next_appoint_date: req.body.next_appoint_date,
        is_primary_physician: req.body.is_primary_physician
      };
  
      Physician.update(req.params.id, updatePhysician, (err, data) => {
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
            message: "Physician not found",
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
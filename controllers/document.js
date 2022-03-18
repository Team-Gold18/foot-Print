const Document = require("../models/document.model");
var dateTime = require('node-datetime');
var dt = dateTime.create();

const cloudinary = require("cloudinary").v2;
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

exports.uploadDocument = async function (req, res) {
  try {
    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: "documents",
    });

    console.log("result", result);

    const newDocument = new Document({
      doctor_id: req.jwt.sub.id,
      document_name: req.body.document_name,
      documentFile: result.secure_url,
      cloudinary_id: result.public_id,
      created_at: dt.format('Y-m-d'),
    });
    try {
      if (!req.body) {
        res.status(400).send({
          success: false,
          code: 400,
          status: "not success",
          message: "error",
          from: "DB",
        });
      }

      Document.uploadDocuments(newDocument, (err, data) => {
        if (err)
          res.status(500).send({
            success: false,
            code: 500,
            status: "not success",
            message: err.message,
          });
        else {
          return res.status(200).json({
            success: true,
            code: 200,
            status: "success",
            document: data,
          });
        }
      });
    } catch (e) {
      return res.status(400).json({ status: 400, message: e.message });
    }
  } catch (e) {
    return res.status(400).json({ status: 400, message: e.message });
  }
};

exports.getAllDocuments = async function (req, res) {
  //console.log("token",req.jwt.sub.id);
  try {
    Document.getAllDocuments((err, data) => {
      if (err) {
        return res.status(500).send({
          success: false,
          code: 500,
          status: "not success",
          message: err.message,
        });
      }
      if (data.length) {
        return res.status(200).json({
          success: true,
          code: 200,
          status: "success",
          data: data,
          message: "All documents are received",
        });
      } else {
        return res.status(200).send({
          success: true,
          code: 200,
          status: "success",
          data: data,
          message: "Document List is empty",
        });
      }
    });
  } catch (e) {
    return res.status(400).json({ status: 400, message: e.message });
  }
};

exports.getDocumentById = async function (req, res) {
  try {
    Document.getDocumentById(req.params.id, (err, data) => {
      if (err) {
        return res.status(500).send({
          success: false,
          code: 500,
          status: "not success",
          message: "error",
        });
      }
      if (data.length) {
        return res.status(200).json({
          success: true,
          code: 200,
          status: "success",
          data: data,
          message: "Document is received",
        });
      } else {
        return res.status(200).send({
          success: true,
          code: 200,
          status: "success",
          data: data,
          message: "Document is not found",
        });
      }
    });
  } catch (e) {
    return res.status(400).json({ status: 400, message: e.message });
  }
};


exports.getDocumentByName = async function (req, res) {
  try {
    
    Document.getDocumentByName(req.params.name, (err, data) => {
      
      if (err) {
        return res.status(500).send({
          success: false,
          code: 500,
          status: "not success",
          message: "error",
        });
      }
      if (data.length) {
        return res.status(200).json({
          success: true,
          code: 200,
          status: "success",
          data: data,
          message: "Document is received",
        });
      } else {
        return res.status(200).send({
          success: true,
          code: 200,
          status: "success",
          data: data,
          message: "Document is not found",
        });
      }
    });
  } catch (e) {
    return res.status(400).json({ status: 400, message: e.message });
  }
};


exports.sortDocumentsByName = async function (req, res) {
  try {
    
    Document.sortDocumentsByName( (err, data) => {
      
      if (err) {
        return res.status(500).send({
          success: false,
          code: 500,
          status: "not success",
          message: "error",
        });
      }
      if (data.length) {
        return res.status(200).json({
          success: true,
          code: 200,
          status: "success",
          data: data,
          message: "Document is received",
        });
      } else {
        return res.status(200).send({
          success: true,
          code: 200,
          status: "success",
          data: data,
          message: "Document is not found",
        });
      }
    });
  } catch (e) {
    return res.status(400).json({ status: 400, message: e.message });
  }
};

exports.sortDocumentsByDate = async function (req, res) {
  try {
    
    Document.sortDocumentsByDate( (err, data) => {
      
      if (err) {
        return res.status(500).send({
          success: false,
          code: 500,
          status: "not success",
          message: "error",
        });
      }
      if (data.length) {
        return res.status(200).json({
          success: true,
          code: 200,
          status: "success",
          data: data,
          message: "Document is received",
        });
      } else {
        return res.status(200).send({
          success: true,
          code: 200,
          status: "success",
          data: data,
          message: "Document is not found",
        });
      }
    });
  } catch (e) {
    return res.status(400).json({ status: 400, message: e.message });
  }
};

exports.getDocumentByDoctorId = async function (req, res) {
  try {
    Document.getDocumentByDoctorId(req.params.id, (err, data) => {
      if (err) {
        return res.status(500).send({
          success: false,
          code: 500,
          status: "not success",
          message: "error",
        });
      }
      if (data.length) {
        return res.status(200).json({
          success: true,
          code: 200,
          status: "success",
          data: data,
          message: "Document is received",
        });
      } else {
        return res.status(200).send({
          success: true,
          code: 200,
          status: "success",
          data: data,
          message: "Document is not found",
        });
      }
    });
  } catch (e) {
    return res.status(400).json({ status: 400, message: e.message });
  }
};


exports.getDocumentByLogedDoctor = async function (req, res) {
  try {
    Document.getDocumentByLogedDoctor(req.jwt.sub.id, (err, data) => {
      if (err) {
        return res.status(500).send({
          success: false,
          code: 500,
          status: "not success",
          message: "error",
        });
      }
      if (data.length) {
        return res.status(200).json({
          success: true,
          code: 200,
          status: "success",
          data: data,
          message: "Document is received",
        });
      } else {
        return res.status(200).send({
          success: true,
          code: 200,
          status: "success",
          data: data,
          message: "Document is not found",
        });
      }
    });
  } catch (e) {
    return res.status(400).json({ status: 400, message: e.message });
  }
};

exports.updateDocument = async function (req, res) {
  try {
    Document.getDocumentById(req.params.id, async (err, data) => {
      if (err) {
        return res.status(400).json({
          success: false,
          code: 500,
          status: "not success",
          message: "error",
        });
      }
      if (data.length) {
        let result;
        if (req.file) {
          result = await cloudinary.uploader.upload(req.file.path, {
            folder: "documents",
          });
        }

        const updatedDocument = new Document({
          doctor_id: req.body.doctor_id || data[0].doctor_id,
          document_name: req.body.document_name || data[0].document_name,
          documentFile: result?.secure_url || data[0].documentFile,
          cloudinary_id: result?.public_id || data[0].cloudinary_id,
        });

       // console.log("new", updatedDocument);
        Document.updateDocument(req.params.id, updatedDocument, (err, data) => {
          if (err)
            return res.status(500).send({
              success: false,
              code: 500,
              status: "not success",
              message: err.message,
            });
          else {
            return res.status(200).json({
              success: true,
              code: 200,
              status: "success",
              document: data,
            });
          }
        });
      } else {
        return res.status(200).json({
          success: true,
          code: 200,
          status: "success",
          message: "Document is not found",
        });
      }
    });
  } catch (e) {
    return res.status(400).json({ status: 400, message: e.message });
  }
};

exports.deleteDocument = async function (req, res) {
  try {
    Document.getDocumentById(req.params.id, async (err, data1) => {
      console.log("data", data1);
      if (err) {
        return res.status(500).send({
          success: false,
          code: 500,
          status: "not success",
          message: "error",
        });
      }
      if (data1.length) {
        const document1 = data1;
        await cloudinary.uploader.destroy(document1[0].cloudinary_id);

        Document.deleteDocument(document1[0].id, (err, data) => {
          if (err) {
            return res.status(500).send({
              success: false,
              code: 500,
              status: "not success",
              message: "error",
            });
          }
          if (data.affectedRows === 1) {
            return res.status(200).json({
              success: true,
              code: 200,
              status: "success",
              message: "succesfully deleted",
            });
          }
        });
      } else {
        return res.status(200).json({
          success: true,
          code: 200,
          status: "success",
          message: "Document is not found",
        });
      }
    });
  } catch (e) {
    return res.status(400).json({ status: 400, message: e.message });
  }
};

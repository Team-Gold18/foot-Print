const routes = require("express").Router();
const uploads = require('../../lib/multer');
const utils = require("../../lib/utils");
var DocumentController = require("../../controllers/document");


routes.post("/upload-document",utils.authMiddleware,uploads.single("documentFile"),DocumentController.uploadDocument);
routes.get("/getAllDocuments",utils.authMiddleware, DocumentController.getAllDocuments);
routes.get("/getDocument/:id", DocumentController.getDocumentById);
routes.put("/updateDocument/:id", uploads.single("documentFile"),DocumentController.updateDocument);
routes.delete("/deleteDocument/:id", DocumentController.deleteDocument);

routes.get("/getDocumentByName/:name", DocumentController.getDocumentByName);
routes.get("/getDocumentByDoctorId/:id", DocumentController.getDocumentByDoctorId);
routes.get("/getDocumentByLogedDoctor",utils.authMiddleware, DocumentController.getDocumentByLogedDoctor);
routes.get("/sortDocumentsByName", DocumentController.sortDocumentsByName);
routes.get("/sortDocumentsByDate", DocumentController.sortDocumentsByDate);

module.exports = routes;
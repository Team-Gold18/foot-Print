const routes = require("express").Router();
const uploads = require('../../lib/multer');
var DocumentController = require("../../controllers/document");


routes.post("/upload-document", uploads.single("documentFile"),DocumentController.uploadDocument);
routes.get("/getAllDocuments", DocumentController.getAllDocuments);
routes.get("/getDocument/:id", DocumentController.getDocumentById);
routes.put("/updateDocument/:id", uploads.single("documentFile"),DocumentController.updateDocument);
routes.delete("/deleteDocument/:id", DocumentController.deleteDocument);

module.exports = routes;
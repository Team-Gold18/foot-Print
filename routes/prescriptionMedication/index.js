const routes = require('express').Router();


var PrescriptionMedicationController = require('../../controllers/prescriptionMedication');

routes.post('/create', PrescriptionMedicationController.create);
routes.put("/update/:id", PrescriptionMedicationController.update);
routes.delete("/delete/:id", PrescriptionMedicationController.delete);
routes.get('/getAll', PrescriptionMedicationController.getAllPrescriptionMedication);
routes.get('/getById/:id', PrescriptionMedicationController.getPrescriptionMedicationById);

  
module.exports = routes;
 



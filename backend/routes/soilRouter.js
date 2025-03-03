import express from 'express'
import { recentReports, soilUpload  } from '../controllers/soilContollers.js';
import { phReport } from '../controllers/phreportController.js';
import upload from '../middleware/multer.js';
const SoilRouter = express.Router();
// Configure multer to store uploaded files in the "uploads" folder
SoilRouter.post('/soilphtest',soilUpload);
SoilRouter.get('/soilreport', recentReports )
SoilRouter.post("/soilreportverification", upload.single("file"), phReport);


export default SoilRouter;
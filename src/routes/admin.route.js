import express from "express";
import { adminLogin, addProject, addCertificate, getAllProjects, getAllCertificates } from '../controllers/admin.controller.js';
import multer from 'multer';

const router = express.Router();

const upload = multer({ storage: multer.memoryStorage() });

router.post("/login", adminLogin);
router.post("/add-project", upload.single('image'), addProject);
router.get("/projects", getAllProjects);
router.post("/add-certificate", upload.array('images',2), addCertificate);
router.get("/certificates", getAllCertificates);

export default router;
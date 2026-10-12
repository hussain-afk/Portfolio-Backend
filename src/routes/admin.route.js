import express from "express";
import { adminLogin, addProject, addCertificate, getAllProjects, getAllCertificates, addMessage, getAllMessages, addInWorkingProject, getAllInWorkingProjects } from '../controllers/admin.controller.js';
import multer from 'multer';

const router = express.Router();

const upload = multer({ storage: multer.memoryStorage() });

router.post("/login", adminLogin);
router.post("/add-project", upload.single('image'), addProject);
router.get("/projects", getAllProjects);
router.post("/add-certificate", upload.array('images',2), addCertificate);
router.post("/add-w-project", upload.single('image'), addInWorkingProject);
router.get("/in-working-projects", getAllInWorkingProjects);
router.get("/certificates", getAllCertificates);
router.post("/message", addMessage);
router.get("/all-messages", getAllMessages);
export default router;
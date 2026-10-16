import express from "express";
import { adminLogin, getCurrentAdmin, addProject, addCertificate, getAllProjects, getAllCertificates, addMessage, getAllMessages, addInWorkingProject, getAllInWorkingProjects, getHeroSection, updateHeroSection } from '../controllers/admin.controller.js';
import multer from 'multer';
import requireAdmin from '../middleware/auth.middleware.js';

const router = express.Router();

const upload = multer({ storage: multer.memoryStorage() });

router.post("/login", adminLogin);
router.get("/session", requireAdmin, getCurrentAdmin);
router.get("/hero", getHeroSection);
router.put("/hero", requireAdmin, updateHeroSection);
router.post("/add-project", requireAdmin, upload.single('image'), addProject);
router.get("/projects", getAllProjects);
router.post("/add-certificate", requireAdmin, upload.array('images',2), addCertificate);
router.post("/add-w-project", requireAdmin, upload.single('image'), addInWorkingProject);
router.get("/in-working-projects", getAllInWorkingProjects);
router.get("/certificates", getAllCertificates);
router.post("/message", addMessage);
router.get("/all-messages", requireAdmin, getAllMessages);
export default router;
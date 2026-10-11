import bcrypt from 'bcrypt';
import Admin from '../models/admin.model.js';
import Project from '../models/project.model.js';
import UploadImage from '../services/uploadImage.service.js';
import generateToken from '../services/token.service.js';
import Certificate from '../models/certificate.model.js';

// Helper function to safely parse arrays from FormData
const parseArrayInput = (input) => {
    if (!input) return [];
    if (Array.isArray(input)) return input;
    if (typeof input === 'string') {
        try {
            return JSON.parse(input);
        } catch (e) {
            return input.split(',').map(item => item.trim()).filter(Boolean);
        }
    }
    return [];
};

// ==========================================
// ADMIN LOGIN
// ==========================================
export const adminLogin = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ message: 'Email and password are required' });
        }

        const admin = await Admin.findOne({ email });
        if (!admin) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        const isPasswordValid = await bcrypt.compare(password, admin.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        const token = generateToken(admin._id, admin.email);

        // Cookie options for security
        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            maxAge: 3600000 // 1 hour
        });

        // Filter out sensitive data (password) before responding
        const adminData = {
            _id: admin._id,
            email: admin.email,
            name: admin.name || 'Admin'
        };

        return res.status(200).json(adminData);
    } catch (error) {
        console.error('Error during admin login:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};

// ==========================================
// ADD PROJECT
// ==========================================
export const addProject = async (req, res) => {
    try {
        const { title, category, description, tech, liveUrl, githubUrl } = req.body;
        const image = req.file;

        // Validation check
        if (!title || !category || !description || !image) {
            return res.status(400).json({ message: 'Title, category, description, and image are required' });
        }

        // Upload image to cloud storage
        const uploadedImage = await UploadImage(image);

        // Safe parsing for tech stack array
        const parsedTech = parseArrayInput(tech);

        const newProject = await Project.create({
            title: title.trim(),
            category: category.trim(),
            description: description.trim(),
            image: uploadedImage,
            tech: parsedTech,
            liveUrl: liveUrl || null,
            githubUrl: githubUrl || null
        });

        return res.status(201).json({ 
            message: 'Project added successfully', 
            project: newProject 
        });
    } catch (error) {
        console.error('Error adding project:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};

// ==========================================
// ADD CERTIFICATE
// ==========================================
export const addCertificate = async (req, res) => {
    try {
        const { title, issuer, date, expires, credentialId, credentialUrl, skills, logo } = req.body;
        
        const files = req.files || [];
        const primaryImage = files[0] || null;
        const secondImage = files[1] || null;

        if (!title || !issuer || !date || !primaryImage) {
            return res.status(400).json({ message: 'Title, issuer, date, and primary image are required' });
        }

        // Parallel Image Upload Optimization using Promise.all
        const uploadPromises = [UploadImage(primaryImage)];
        if (secondImage) {
            uploadPromises.push(UploadImage(secondImage));
        }

        const uploadedUrls = await Promise.all(uploadPromises);
        const uploadedImage1 = uploadedUrls[0];
        const uploadedImage2 = secondImage ? uploadedUrls[1] : (logo || uploadedImage1);

        const parsedSkills = parseArrayInput(skills);

        const newCertificate = await Certificate.create({
            title: title.trim(),
            issuer: issuer.trim(),
            date,
            expires: expires || null,
            credentialId: credentialId || null,
            credentialUrl: credentialUrl || null,
            image: uploadedImage1,
            skills: parsedSkills,
            logo: uploadedImage2
        });

        return res.status(201).json({ 
            message: 'Certificate added successfully', 
            certificate: newCertificate 
        });
    } catch (error) {
        console.error('Error adding certificate:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};

// ==========================================
// GET ALL PROJECTS
// ==========================================
export const getAllProjects = async (req, res) => {
    try {
        const projects = await Project.find();
        return res.status(200).json(projects);
    } catch (error) {
        console.error('Error fetching projects:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};

// ==========================================
// GET ALL CERTIFICATES
// ==========================================
export const getAllCertificates = async (req, res) => {
    try {
        const certificates = await Certificate.find().sort({ createdAt: -1 });
        return res.status(200).json(certificates);
    } catch (error) {
        console.error('Error fetching certificates:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};
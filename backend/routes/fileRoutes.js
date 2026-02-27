import express from 'express';
import { authenticate } from '../middleware/auth.js';
import { File, Project } from '../models/index.js';

const router = express.Router();

// Get all files (with optional filters)
router.get('/', authenticate, async (req, res) => {
    try {
        const { projectId, clientId } = req.query;
        const where = {};

        if (projectId) where.projectId = projectId;

        const files = await File.findAll({
            where,
            include: [
                {
                    model: Project,
                    as: 'project',
                    attributes: ['id', 'name']
                }
            ],
            order: [['uploadDate', 'DESC']]
        });

        // Transform to match frontend expectations
        const transformedFiles = files.map(f => ({
            id: f.id,
            name: f.originalName,
            type: f.mimeType,
            size: f.size,
            url: f.path,
            projectId: f.projectId,
            uploadedBy: f.uploadedByUserId,
            uploadedAt: f.uploadDate,
            Project: f.project
        }));

        res.json({ success: true, files: transformedFiles });
    } catch (error) {
        console.error('Error fetching files:', error);
        res.status(500).json({ success: false, message: 'Failed to fetch files' });
    }
});

// Get file by ID
router.get('/:id', authenticate, async (req, res) => {
    try {
        const file = await File.findByPk(req.params.id, {
            include: [
                {
                    model: Project,
                    as: 'project',
                    attributes: ['id', 'name']
                }
            ]
        });
        
        if (!file) {
            return res.status(404).json({ success: false, message: 'File not found' });
        }

        const transformedFile = {
            id: file.id,
            name: file.originalName,
            type: file.mimeType,
            size: file.size,
            url: file.path,
            projectId: file.projectId,
            uploadedBy: file.uploadedByUserId,
            uploadedAt: file.uploadDate,
            Project: file.project
        };

        res.json({ success: true, file: transformedFile });
    } catch (error) {
        console.error('Error fetching file:', error);
        res.status(500).json({ success: false, message: 'Failed to fetch file' });
    }
});

// Create new file record
router.post('/', authenticate, async (req, res) => {
    try {
        const { name, type, size, url, projectId } = req.body;

        const file = await File.create({
            filename: `${Date.now()}_${name}`,
            originalName: name,
            path: url || `/uploads/${Date.now()}_${name}`,
            size: size || 0,
            mimeType: type || 'application/octet-stream',
            projectId,
            uploadedByUserId: req.user.id,
            uploadDate: new Date()
        });

        const fileWithProject = await File.findByPk(file.id, {
            include: [
                {
                    model: Project,
                    as: 'project',
                    attributes: ['id', 'name']
                }
            ]
        });

        const transformedFile = {
            id: fileWithProject.id,
            name: fileWithProject.originalName,
            type: fileWithProject.mimeType,
            size: fileWithProject.size,
            url: fileWithProject.path,
            projectId: fileWithProject.projectId,
            uploadedBy: fileWithProject.uploadedByUserId,
            uploadedAt: fileWithProject.uploadDate,
            Project: fileWithProject.project
        };

        res.status(201).json({ success: true, file: transformedFile });
    } catch (error) {
        console.error('Error creating file:', error);
        res.status(500).json({ success: false, message: 'Failed to create file' });
    }
});

// Delete file
router.delete('/:id', authenticate, async (req, res) => {
    try {
        const file = await File.findByPk(req.params.id);
        
        if (!file) {
            return res.status(404).json({ success: false, message: 'File not found' });
        }

        await file.destroy();
        res.json({ success: true, message: 'File deleted successfully' });
    } catch (error) {
        console.error('Error deleting file:', error);
        res.status(500).json({ success: false, message: 'Failed to delete file' });
    }
});

export default router;

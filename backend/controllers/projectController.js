import { Project, Client, User, Activity } from '../models/index.js';
import { Op } from 'sequelize';

export const createProject = async (req, res) => {
    try {
        const { name, clientId, service, status, deadline, developerId, progress, description } = req.body;

        // Validate required fields
        if (!name || !clientId || !service) {
            return res.status(400).json({ success: false, message: 'Name, client, and service are required' });
        }

        // Verify client exists
        const client = await Client.findByPk(clientId);
        if (!client) {
            return res.status(400).json({ success: false, message: 'Invalid client ID' });
        }

        // Verify developer exists if provided
        if (developerId) {
            const developer = await User.findByPk(developerId);
            if (!developer) {
                return res.status(400).json({ success: false, message: 'Invalid developer ID' });
            }
        }

        const project = await Project.create({
            name,
            clientId,
            service,
            status,
            deadline,
            developerId,
            progress: progress || 0,
            description
        });

        // Log activity
        await Activity.create({
            type: 'project_created',
            description: `Project "${name}" created for ${client.name}`,
            userId: req.user.id,
            relatedId: project.id,
            relatedModel: 'Project'
        });

        const createdProject = await Project.findByPk(project.id, {
            include: [
                { model: Client, as: 'client' },
                { model: User, as: 'developer' }
            ]
        });

        res.status(201).json({ success: true, project: createdProject });
    } catch (error) {
        console.error('Create project error:', error);
        res.status(500).json({ success: false, message: 'Server error creating project' });
    }
};

export const getProjects = async (req, res) => {
    try {
        const { status, service, clientId, page = 1, limit = 10 } = req.query;

        const where = {};
        if (status) where.status = status;
        if (service) where.service = service;
        if (clientId) where.clientId = clientId;

        // If user is a Client, only show their projects
        if (req.user.role === 'Client') {
            // Find the client record associated with this user's email
            const client = await Client.findOne({ where: { email: req.user.email } });
            if (client) {
                where.clientId = client.id;
            } else {
                // No client record found, return empty
                return res.json({
                    success: true,
                    projects: [],
                    total: 0,
                    page: parseInt(page),
                    limit: parseInt(limit),
                    totalPages: 0
                });
            }
        }

        const offset = (page - 1) * limit;

        const { count, rows } = await Project.findAndCountAll({
            where,
            limit: parseInt(limit),
            offset: parseInt(offset),
            order: [['createdAt', 'DESC']],
            include: [
                { model: Client, as: 'client', attributes: ['id', 'name', 'email', 'company'] },
                { model: User, as: 'developer', attributes: ['id', 'name', 'email'] }
            ]
        });

        res.json({
            success: true,
            projects: rows,
            total: count,
            page: parseInt(page),
            limit: parseInt(limit),
            totalPages: Math.ceil(count / limit)
        });
    } catch (error) {
        console.error('Get projects error:', error);
        res.status(500).json({ success: false, message: 'Server error fetching projects' });
    }
};

export const getProjectById = async (req, res) => {
    try {
        const { id } = req.params;

        const project = await Project.findByPk(id, {
            include: [
                { model: Client, as: 'client' },
                { model: User, as: 'developer' }
            ]
        });

        if (!project) {
            return res.status(404).json({ success: false, message: 'Project not found' });
        }

        // If user is a Client, verify they own this project
        if (req.user.role === 'Client') {
            const client = await Client.findOne({ where: { email: req.user.email } });
            if (!client || project.clientId !== client.id) {
                return res.status(403).json({ success: false, message: 'Access denied' });
            }
        }

        res.json({ success: true, project });
    } catch (error) {
        console.error('Get project error:', error);
        res.status(500).json({ success: false, message: 'Server error fetching project' });
    }
};

export const updateProject = async (req, res) => {
    try {
        const { id } = req.params;
        const updates = req.body;

        const project = await Project.findByPk(id);
        if (!project) {
            return res.status(404).json({ success: false, message: 'Project not found' });
        }

        // Verify client if being updated
        if (updates.clientId && updates.clientId !== project.clientId) {
            const client = await Client.findByPk(updates.clientId);
            if (!client) {
                return res.status(400).json({ success: false, message: 'Invalid client ID' });
            }
        }

        // Verify developer if being updated
        if (updates.developerId && updates.developerId !== project.developerId) {
            const developer = await User.findByPk(updates.developerId);
            if (!developer) {
                return res.status(400).json({ success: false, message: 'Invalid developer ID' });
            }
        }

        // Log status change
        if (updates.status && updates.status !== project.status) {
            await Activity.create({
                type: 'project_status_changed',
                description: `Project "${project.name}" status changed from ${project.status} to ${updates.status}`,
                userId: req.user.id,
                relatedId: project.id,
                relatedModel: 'Project'
            });
        }

        await project.update(updates);

        const updatedProject = await Project.findByPk(id, {
            include: [
                { model: Client, as: 'client' },
                { model: User, as: 'developer' }
            ]
        });

        res.json({ success: true, project: updatedProject });
    } catch (error) {
        console.error('Update project error:', error);
        res.status(500).json({ success: false, message: 'Server error updating project' });
    }
};

export const deleteProject = async (req, res) => {
    try {
        const { id } = req.params;

        const project = await Project.findByPk(id);
        if (!project) {
            return res.status(404).json({ success: false, message: 'Project not found' });
        }

        await project.destroy();

        res.json({ success: true, message: 'Project deleted successfully' });
    } catch (error) {
        console.error('Delete project error:', error);
        res.status(500).json({ success: false, message: 'Server error deleting project' });
    }
};

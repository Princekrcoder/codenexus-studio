import { Communication, Client, User } from '../models/index.js';
import { Op } from 'sequelize';

export const createCommunication = async (req, res) => {
    try {
        const { clientId, type, message, internal, followUp } = req.body;

        // Validate required fields
        if (!clientId || !type || !message) {
            return res.status(400).json({ 
                success: false, 
                message: 'Client, type, and message are required' 
            });
        }

        // Verify client exists
        const client = await Client.findByPk(clientId);
        if (!client) {
            return res.status(400).json({ success: false, message: 'Invalid client ID' });
        }

        const communication = await Communication.create({
            clientId,
            type,
            message,
            byUserId: req.user.id,
            internal: internal || false,
            followUp
        });

        const createdComm = await Communication.findByPk(communication.id, {
            include: [
                { model: Client, as: 'client', attributes: ['id', 'name', 'email'] },
                { model: User, as: 'user', attributes: ['id', 'name'] }
            ]
        });

        res.status(201).json({ success: true, communication: createdComm });
    } catch (error) {
        console.error('Create communication error:', error);
        res.status(500).json({ success: false, message: 'Server error creating communication' });
    }
};

export const getCommunications = async (req, res) => {
    try {
        const { clientId, type, internal, page = 1, limit = 20 } = req.query;

        const where = {};
        if (clientId) where.clientId = clientId;
        if (type) where.type = type;
        if (internal !== undefined) where.internal = internal === 'true';

        const offset = (page - 1) * limit;

        const { count, rows } = await Communication.findAndCountAll({
            where,
            limit: parseInt(limit),
            offset: parseInt(offset),
            order: [['date', 'DESC']],
            include: [
                { model: Client, as: 'client', attributes: ['id', 'name', 'email'] },
                { model: User, as: 'user', attributes: ['id', 'name'] }
            ]
        });

        res.json({
            success: true,
            communications: rows,
            total: count,
            page: parseInt(page),
            limit: parseInt(limit),
            totalPages: Math.ceil(count / limit)
        });
    } catch (error) {
        console.error('Get communications error:', error);
        res.status(500).json({ success: false, message: 'Server error fetching communications' });
    }
};

export const getFollowUpReminders = async (req, res) => {
    try {
        const today = new Date();
        const nextWeek = new Date();
        nextWeek.setDate(today.getDate() + 7);

        const reminders = await Communication.findAll({
            where: {
                followUp: {
                    [Op.between]: [today, nextWeek]
                }
            },
            order: [['followUp', 'ASC']],
            include: [
                { model: Client, as: 'client', attributes: ['id', 'name', 'email', 'phone'] },
                { model: User, as: 'user', attributes: ['id', 'name'] }
            ]
        });

        res.json({ success: true, reminders });
    } catch (error) {
        console.error('Get follow-up reminders error:', error);
        res.status(500).json({ success: false, message: 'Server error fetching reminders' });
    }
};

export const updateCommunication = async (req, res) => {
    try {
        const { id } = req.params;
        const updates = req.body;

        const communication = await Communication.findByPk(id);
        if (!communication) {
            return res.status(404).json({ success: false, message: 'Communication not found' });
        }

        await communication.update(updates);

        const updatedComm = await Communication.findByPk(id, {
            include: [
                { model: Client, as: 'client' },
                { model: User, as: 'user' }
            ]
        });

        res.json({ success: true, communication: updatedComm });
    } catch (error) {
        console.error('Update communication error:', error);
        res.status(500).json({ success: false, message: 'Server error updating communication' });
    }
};

export const deleteCommunication = async (req, res) => {
    try {
        const { id } = req.params;

        const communication = await Communication.findByPk(id);
        if (!communication) {
            return res.status(404).json({ success: false, message: 'Communication not found' });
        }

        await communication.destroy();

        res.json({ success: true, message: 'Communication deleted successfully' });
    } catch (error) {
        console.error('Delete communication error:', error);
        res.status(500).json({ success: false, message: 'Server error deleting communication' });
    }
};

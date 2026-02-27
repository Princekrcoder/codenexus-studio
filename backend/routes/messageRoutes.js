import express from 'express';
import { authenticate } from '../middleware/auth.js';
import { Message, User, Project } from '../models/index.js';

const router = express.Router();

// Get all messages (with optional filters)
router.get('/', authenticate, async (req, res) => {
    try {
        const { projectId } = req.query;
        const where = {};

        if (projectId) where.projectId = projectId;

        const messages = await Message.findAll({
            where,
            include: [
                {
                    model: User,
                    as: 'sender',
                    attributes: ['id', 'name', 'email', 'role']
                },
                {
                    model: Project,
                    as: 'project',
                    attributes: ['id', 'name']
                }
            ],
            order: [['timestamp', 'DESC']]
        });

        // Transform to match frontend expectations
        const transformedMessages = messages.map(m => ({
            id: m.id,
            content: m.content,
            projectId: m.projectId,
            senderId: m.senderId,
            createdAt: m.timestamp,
            isRead: m.readBy?.includes(req.user.id) || false,
            Sender: m.sender,
            Project: m.project
        }));

        res.json({ success: true, messages: transformedMessages });
    } catch (error) {
        console.error('Error fetching messages:', error);
        res.status(500).json({ success: false, message: 'Failed to fetch messages' });
    }
});

// Get message by ID
router.get('/:id', authenticate, async (req, res) => {
    try {
        const message = await Message.findByPk(req.params.id, {
            include: [
                {
                    model: User,
                    as: 'sender',
                    attributes: ['id', 'name', 'email', 'role']
                },
                {
                    model: Project,
                    as: 'project',
                    attributes: ['id', 'name']
                }
            ]
        });
        
        if (!message) {
            return res.status(404).json({ success: false, message: 'Message not found' });
        }

        const transformedMessage = {
            id: message.id,
            content: message.content,
            projectId: message.projectId,
            senderId: message.senderId,
            createdAt: message.timestamp,
            isRead: message.readBy?.includes(req.user.id) || false,
            Sender: message.sender,
            Project: message.project
        };

        res.json({ success: true, message: transformedMessage });
    } catch (error) {
        console.error('Error fetching message:', error);
        res.status(500).json({ success: false, message: 'Failed to fetch message' });
    }
});

// Create new message
router.post('/', authenticate, async (req, res) => {
    try {
        const { content, projectId } = req.body;

        const message = await Message.create({
            content,
            projectId: projectId || null,
            senderId: req.user.id,
            timestamp: new Date(),
            readBy: [req.user.id]
        });

        const messageWithSender = await Message.findByPk(message.id, {
            include: [
                {
                    model: User,
                    as: 'sender',
                    attributes: ['id', 'name', 'email', 'role']
                },
                {
                    model: Project,
                    as: 'project',
                    attributes: ['id', 'name']
                }
            ]
        });

        const transformedMessage = {
            id: messageWithSender.id,
            content: messageWithSender.content,
            projectId: messageWithSender.projectId,
            senderId: messageWithSender.senderId,
            createdAt: messageWithSender.timestamp,
            isRead: true,
            Sender: messageWithSender.sender,
            Project: messageWithSender.project
        };

        res.status(201).json({ success: true, message: transformedMessage });
    } catch (error) {
        console.error('Error creating message:', error);
        res.status(500).json({ success: false, message: 'Failed to create message' });
    }
});

// Mark message as read
router.put('/:id/read', authenticate, async (req, res) => {
    try {
        const message = await Message.findByPk(req.params.id);
        
        if (!message) {
            return res.status(404).json({ success: false, message: 'Message not found' });
        }

        const readBy = message.readBy || [];
        if (!readBy.includes(req.user.id)) {
            readBy.push(req.user.id);
            message.readBy = readBy;
            await message.save();
        }

        res.json({ success: true, message });
    } catch (error) {
        console.error('Error updating message:', error);
        res.status(500).json({ success: false, message: 'Failed to update message' });
    }
});

// Delete message
router.delete('/:id', authenticate, async (req, res) => {
    try {
        const message = await Message.findByPk(req.params.id);
        
        if (!message) {
            return res.status(404).json({ success: false, message: 'Message not found' });
        }

        await message.destroy();
        res.json({ success: true, message: 'Message deleted successfully' });
    } catch (error) {
        console.error('Error deleting message:', error);
        res.status(500).json({ success: false, message: 'Failed to delete message' });
    }
});

export default router;

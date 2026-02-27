import { Lead, Client, Activity } from '../models/index.js';

export const createLead = async (req, res) => {
    try {
        const { name, email, phone, source, service, status, notes } = req.body;

        // Validate required fields
        if (!name || !email || !phone || !source || !service) {
            return res.status(400).json({ 
                success: false, 
                message: 'Name, email, phone, source, and service are required' 
            });
        }

        const lead = await Lead.create({
            name,
            email,
            phone,
            source,
            service,
            status: status || 'New',
            notes
        });

        res.status(201).json({ success: true, lead });
    } catch (error) {
        console.error('Create lead error:', error);
        res.status(500).json({ success: false, message: 'Server error creating lead' });
    }
};

export const getLeads = async (req, res) => {
    try {
        const { status, source, page = 1, limit = 10 } = req.query;

        const where = {};
        if (status) where.status = status;
        if (source) where.source = source;

        const offset = (page - 1) * limit;

        const { count, rows } = await Lead.findAndCountAll({
            where,
            limit: parseInt(limit),
            offset: parseInt(offset),
            order: [['date', 'DESC']],
            include: [
                { 
                    model: Client, 
                    as: 'convertedClient',
                    attributes: ['id', 'name', 'email']
                }
            ]
        });

        res.json({
            success: true,
            leads: rows,
            total: count,
            page: parseInt(page),
            limit: parseInt(limit),
            totalPages: Math.ceil(count / limit)
        });
    } catch (error) {
        console.error('Get leads error:', error);
        res.status(500).json({ success: false, message: 'Server error fetching leads' });
    }
};

export const getLeadById = async (req, res) => {
    try {
        const { id } = req.params;

        const lead = await Lead.findByPk(id, {
            include: [
                { model: Client, as: 'convertedClient' }
            ]
        });

        if (!lead) {
            return res.status(404).json({ success: false, message: 'Lead not found' });
        }

        res.json({ success: true, lead });
    } catch (error) {
        console.error('Get lead error:', error);
        res.status(500).json({ success: false, message: 'Server error fetching lead' });
    }
};

export const updateLead = async (req, res) => {
    try {
        const { id } = req.params;
        const updates = req.body;

        const lead = await Lead.findByPk(id);
        if (!lead) {
            return res.status(404).json({ success: false, message: 'Lead not found' });
        }

        await lead.update(updates);

        res.json({ success: true, lead });
    } catch (error) {
        console.error('Update lead error:', error);
        res.status(500).json({ success: false, message: 'Server error updating lead' });
    }
};

export const convertLeadToClient = async (req, res) => {
    try {
        const { id } = req.params;

        const lead = await Lead.findByPk(id);
        if (!lead) {
            return res.status(404).json({ success: false, message: 'Lead not found' });
        }

        if (lead.status === 'Converted') {
            return res.status(400).json({ success: false, message: 'Lead already converted' });
        }

        // Create client from lead
        const client = await Client.create({
            name: lead.name,
            email: lead.email,
            phone: lead.phone,
            company: lead.name, // Default to name if no company
            type: 'Business',
            status: 'Active',
            servicePreference: [lead.service]
        });

        // Update lead
        await lead.update({
            status: 'Converted',
            convertedToClientId: client.id
        });

        // Log activity
        await Activity.create({
            type: 'lead_converted',
            description: `Lead "${lead.name}" converted to client`,
            userId: req.user.id,
            relatedId: lead.id,
            relatedModel: 'Lead'
        });

        res.json({ success: true, client, lead });
    } catch (error) {
        console.error('Convert lead error:', error);
        res.status(500).json({ success: false, message: 'Server error converting lead' });
    }
};

export const deleteLead = async (req, res) => {
    try {
        const { id } = req.params;

        const lead = await Lead.findByPk(id);
        if (!lead) {
            return res.status(404).json({ success: false, message: 'Lead not found' });
        }

        await lead.destroy();

        res.json({ success: true, message: 'Lead deleted successfully' });
    } catch (error) {
        console.error('Delete lead error:', error);
        res.status(500).json({ success: false, message: 'Server error deleting lead' });
    }
};

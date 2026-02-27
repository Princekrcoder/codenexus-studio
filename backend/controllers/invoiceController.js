import { Invoice, Client, Project, Activity } from '../models/index.js';
import sequelize from '../config/database.js';

export const createInvoice = async (req, res) => {
    try {
        const { clientId, projectId, amount, paid, paymentMode, dueDate, notes } = req.body;

        // Validate required fields
        if (!clientId || !projectId || !amount) {
            return res.status(400).json({ 
                success: false, 
                message: 'Client, project, and amount are required' 
            });
        }

        // Verify client and project exist
        const client = await Client.findByPk(clientId);
        if (!client) {
            return res.status(400).json({ success: false, message: 'Invalid client ID' });
        }

        const project = await Project.findByPk(projectId);
        if (!project) {
            return res.status(400).json({ success: false, message: 'Invalid project ID' });
        }

        const invoice = await Invoice.create({
            clientId,
            projectId,
            amount,
            paid: paid || 0,
            paymentMode,
            dueDate,
            notes
        });

        // Log activity
        await Activity.create({
            type: 'invoice_created',
            description: `Invoice ${invoice.invoiceId} created for ${client.name} - ₹${amount}`,
            userId: req.user.id,
            relatedId: invoice.id,
            relatedModel: 'Invoice'
        });

        const createdInvoice = await Invoice.findByPk(invoice.id, {
            include: [
                { model: Client, as: 'client', attributes: ['id', 'name', 'email'] },
                { model: Project, as: 'project', attributes: ['id', 'name'] }
            ]
        });

        res.status(201).json({ success: true, invoice: createdInvoice });
    } catch (error) {
        console.error('Create invoice error:', error);
        res.status(500).json({ success: false, message: 'Server error creating invoice' });
    }
};

export const getInvoices = async (req, res) => {
    try {
        const { status, clientId, page = 1, limit = 10 } = req.query;

        const where = {};
        if (status) where.status = status;
        if (clientId) where.clientId = clientId;

        // If user is a Client, only show their invoices
        if (req.user.role === 'Client') {
            // Find the client record associated with this user's email
            const client = await Client.findOne({ where: { email: req.user.email } });
            if (client) {
                where.clientId = client.id;
            } else {
                // No client record found, return empty
                return res.json({
                    success: true,
                    invoices: [],
                    total: 0,
                    page: parseInt(page),
                    limit: parseInt(limit),
                    totalPages: 0
                });
            }
        }

        const offset = (page - 1) * limit;

        const { count, rows } = await Invoice.findAndCountAll({
            where,
            limit: parseInt(limit),
            offset: parseInt(offset),
            order: [['date', 'DESC']],
            include: [
                { model: Client, as: 'client', attributes: ['id', 'name', 'email'] },
                { model: Project, as: 'project', attributes: ['id', 'name'] }
            ]
        });

        res.json({
            success: true,
            invoices: rows,
            total: count,
            page: parseInt(page),
            limit: parseInt(limit),
            totalPages: Math.ceil(count / limit)
        });
    } catch (error) {
        console.error('Get invoices error:', error);
        res.status(500).json({ success: false, message: 'Server error fetching invoices' });
    }
};

export const getInvoiceById = async (req, res) => {
    try {
        const { id } = req.params;

        const invoice = await Invoice.findByPk(id, {
            include: [
                { model: Client, as: 'client' },
                { model: Project, as: 'project' }
            ]
        });

        if (!invoice) {
            return res.status(404).json({ success: false, message: 'Invoice not found' });
        }

        // If user is a Client, verify they own this invoice
        if (req.user.role === 'Client') {
            const client = await Client.findOne({ where: { email: req.user.email } });
            if (!client || invoice.clientId !== client.id) {
                return res.status(403).json({ success: false, message: 'Access denied' });
            }
        }

        res.json({ success: true, invoice });
    } catch (error) {
        console.error('Get invoice error:', error);
        res.status(500).json({ success: false, message: 'Server error fetching invoice' });
    }
};

export const updateInvoice = async (req, res) => {
    try {
        const { id } = req.params;
        const updates = req.body;

        const invoice = await Invoice.findByPk(id);
        if (!invoice) {
            return res.status(404).json({ success: false, message: 'Invoice not found' });
        }

        await invoice.update(updates);

        const updatedInvoice = await Invoice.findByPk(id, {
            include: [
                { model: Client, as: 'client' },
                { model: Project, as: 'project' }
            ]
        });

        res.json({ success: true, invoice: updatedInvoice });
    } catch (error) {
        console.error('Update invoice error:', error);
        res.status(500).json({ success: false, message: 'Server error updating invoice' });
    }
};

export const markAsPaid = async (req, res) => {
    try {
        const { id } = req.params;
        const { paidAmount, paymentMode } = req.body;

        const invoice = await Invoice.findByPk(id, {
            include: [{ model: Client, as: 'client' }]
        });

        if (!invoice) {
            return res.status(404).json({ success: false, message: 'Invoice not found' });
        }

        const newPaidAmount = paidAmount !== undefined ? paidAmount : invoice.amount;

        await invoice.update({
            paid: newPaidAmount,
            paymentMode: paymentMode || invoice.paymentMode
        });

        // Log activity if fully paid
        if (parseFloat(newPaidAmount) === parseFloat(invoice.amount)) {
            await Activity.create({
                type: 'invoice_paid',
                description: `Invoice ${invoice.invoiceId} paid by ${invoice.client.name} - ₹${invoice.amount}`,
                userId: req.user.id,
                relatedId: invoice.id,
                relatedModel: 'Invoice'
            });
        }

        const updatedInvoice = await Invoice.findByPk(id, {
            include: [
                { model: Client, as: 'client' },
                { model: Project, as: 'project' }
            ]
        });

        res.json({ success: true, invoice: updatedInvoice });
    } catch (error) {
        console.error('Mark as paid error:', error);
        res.status(500).json({ success: false, message: 'Server error updating payment' });
    }
};

export const getRevenueStats = async (req, res) => {
    try {
        const stats = await Invoice.findOne({
            attributes: [
                [sequelize.fn('SUM', sequelize.col('amount')), 'totalRevenue'],
                [sequelize.fn('SUM', sequelize.col('paid')), 'collectedRevenue'],
                [sequelize.fn('SUM', sequelize.literal('amount - paid')), 'outstandingRevenue']
            ],
            raw: true
        });

        res.json({
            success: true,
            stats: {
                totalRevenue: parseFloat(stats.totalRevenue) || 0,
                collectedRevenue: parseFloat(stats.collectedRevenue) || 0,
                outstandingRevenue: parseFloat(stats.outstandingRevenue) || 0
            }
        });
    } catch (error) {
        console.error('Get revenue stats error:', error);
        res.status(500).json({ success: false, message: 'Server error fetching revenue stats' });
    }
};

export const deleteInvoice = async (req, res) => {
    try {
        const { id } = req.params;

        const invoice = await Invoice.findByPk(id);
        if (!invoice) {
            return res.status(404).json({ success: false, message: 'Invoice not found' });
        }

        await invoice.destroy();

        res.json({ success: true, message: 'Invoice deleted successfully' });
    } catch (error) {
        console.error('Delete invoice error:', error);
        res.status(500).json({ success: false, message: 'Server error deleting invoice' });
    }
};

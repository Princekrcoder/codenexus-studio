import { ContactInquiry } from '../models/index.js';

export const submitContactForm = async (req, res) => {
    try {
        const { name, email, phone, message } = req.body;

        // Validate required fields
        if (!name || !email || !message) {
            return res.status(400).json({ 
                success: false, 
                message: 'Name, email, and message are required' 
            });
        }

        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ success: false, message: 'Invalid email format' });
        }

        const inquiry = await ContactInquiry.create({
            name,
            email,
            phone,
            message
        });

        // TODO: Send email notification to admins

        res.status(201).json({ 
            success: true, 
            message: 'Thank you for contacting us! We will get back to you soon.',
            inquiry: {
                id: inquiry.id,
                name: inquiry.name,
                email: inquiry.email
            }
        });
    } catch (error) {
        console.error('Submit contact form error:', error);
        res.status(500).json({ success: false, message: 'Server error submitting inquiry' });
    }
};

export const getInquiries = async (req, res) => {
    try {
        const { status, page = 1, limit = 20 } = req.query;

        const where = {};
        if (status) where.status = status;

        const offset = (page - 1) * limit;

        const { count, rows } = await ContactInquiry.findAndCountAll({
            where,
            limit: parseInt(limit),
            offset: parseInt(offset),
            order: [['date', 'DESC']]
        });

        res.json({
            success: true,
            inquiries: rows,
            total: count,
            page: parseInt(page),
            limit: parseInt(limit),
            totalPages: Math.ceil(count / limit)
        });
    } catch (error) {
        console.error('Get inquiries error:', error);
        res.status(500).json({ success: false, message: 'Server error fetching inquiries' });
    }
};

export const updateInquiryStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;

        if (!status) {
            return res.status(400).json({ success: false, message: 'Status is required' });
        }

        const inquiry = await ContactInquiry.findByPk(id);
        if (!inquiry) {
            return res.status(404).json({ success: false, message: 'Inquiry not found' });
        }

        await inquiry.update({ status });

        res.json({ success: true, inquiry });
    } catch (error) {
        console.error('Update inquiry status error:', error);
        res.status(500).json({ success: false, message: 'Server error updating inquiry' });
    }
};

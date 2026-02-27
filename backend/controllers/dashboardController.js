import { Client, Project, Lead, Invoice, Activity, User } from '../models/index.js';
import sequelize from '../config/database.js';

export const getDashboardData = async (req, res) => {
    try {
        // Revenue stats
        const revenueStats = await Invoice.findOne({
            attributes: [
                [sequelize.fn('SUM', sequelize.col('amount')), 'total'],
                [sequelize.fn('SUM', sequelize.col('paid')), 'collected'],
                [sequelize.fn('SUM', sequelize.literal('amount - paid')), 'outstanding']
            ],
            raw: true
        });

        // Client stats
        const clientStats = await Client.findAll({
            attributes: [
                'status',
                [sequelize.fn('COUNT', sequelize.col('id')), 'count']
            ],
            group: ['status'],
            raw: true
        });

        const totalClients = await Client.count();

        // Project stats
        const projectStats = await Project.findAll({
            attributes: [
                'status',
                [sequelize.fn('COUNT', sequelize.col('id')), 'count']
            ],
            group: ['status'],
            raw: true
        });

        const totalProjects = await Project.count();

        // Lead stats
        const leadStats = await Lead.findAll({
            attributes: [
                'status',
                [sequelize.fn('COUNT', sequelize.col('id')), 'count']
            ],
            group: ['status'],
            raw: true
        });

        const totalLeads = await Lead.count();

        // Payment breakdown
        const paymentBreakdown = await Invoice.findAll({
            attributes: [
                'status',
                [sequelize.fn('COUNT', sequelize.col('id')), 'count']
            ],
            group: ['status'],
            raw: true
        });

        // Recent activity
        const recentActivity = await Activity.findAll({
            limit: 10,
            order: [['timestamp', 'DESC']],
            include: [
                {
                    model: User,
                    as: 'user',
                    attributes: ['id', 'name']
                }
            ]
        });

        // Format stats
        const formatStats = (stats) => {
            const result = {};
            stats.forEach(stat => {
                result[stat.status] = parseInt(stat.count);
            });
            return result;
        };

        res.json({
            success: true,
            data: {
                revenue: {
                    total: parseFloat(revenueStats.total) || 0,
                    collected: parseFloat(revenueStats.collected) || 0,
                    outstanding: parseFloat(revenueStats.outstanding) || 0
                },
                clients: {
                    total: totalClients,
                    byStatus: formatStats(clientStats)
                },
                projects: {
                    total: totalProjects,
                    byStatus: formatStats(projectStats)
                },
                leads: {
                    total: totalLeads,
                    byStatus: formatStats(leadStats)
                },
                paymentBreakdown: formatStats(paymentBreakdown),
                recentActivity
            }
        });
    } catch (error) {
        console.error('Get dashboard data error:', error);
        res.status(500).json({ success: false, message: 'Server error fetching dashboard data' });
    }
};

export const getActivityFeed = async (req, res) => {
    try {
        const { page = 1, limit = 20 } = req.query;
        const offset = (page - 1) * limit;

        const { count, rows } = await Activity.findAndCountAll({
            limit: parseInt(limit),
            offset: parseInt(offset),
            order: [['timestamp', 'DESC']],
            include: [
                {
                    model: User,
                    as: 'user',
                    attributes: ['id', 'name', 'email']
                }
            ]
        });

        res.json({
            success: true,
            activities: rows,
            total: count,
            page: parseInt(page),
            limit: parseInt(limit),
            totalPages: Math.ceil(count / limit)
        });
    } catch (error) {
        console.error('Get activity feed error:', error);
        res.status(500).json({ success: false, message: 'Server error fetching activity feed' });
    }
};

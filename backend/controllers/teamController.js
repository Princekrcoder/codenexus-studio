import { User } from '../models/index.js';

export const createTeamMember = async (req, res) => {
    try {
        const { name, email, password, role, status } = req.body;

        // Validate required fields
        if (!name || !email || !password || !role) {
            return res.status(400).json({ 
                success: false, 
                message: 'Name, email, password, and role are required' 
            });
        }

        // Check if user already exists
        const existingUser = await User.findOne({ where: { email: email.toLowerCase() } });
        if (existingUser) {
            return res.status(400).json({ success: false, message: 'User with this email already exists' });
        }

        const user = await User.create({
            name,
            email,
            password,
            role,
            status: status || 'Active'
        });

        // Remove password from response
        const userResponse = user.toJSON();
        delete userResponse.password;

        res.status(201).json({ success: true, member: userResponse });
    } catch (error) {
        console.error('Create team member error:', error);
        res.status(500).json({ success: false, message: 'Server error creating team member' });
    }
};

export const getTeamMembers = async (req, res) => {
    try {
        const { role, status, page = 1, limit = 20 } = req.query;

        const where = {};
        if (role) where.role = role;
        if (status) where.status = status;

        const offset = (page - 1) * limit;

        const { count, rows } = await User.findAndCountAll({
            where,
            limit: parseInt(limit),
            offset: parseInt(offset),
            order: [['createdAt', 'DESC']],
            attributes: { exclude: ['password'] }
        });

        res.json({
            success: true,
            members: rows,
            total: count,
            page: parseInt(page),
            limit: parseInt(limit),
            totalPages: Math.ceil(count / limit)
        });
    } catch (error) {
        console.error('Get team members error:', error);
        res.status(500).json({ success: false, message: 'Server error fetching team members' });
    }
};

export const getTeamMemberById = async (req, res) => {
    try {
        const { id } = req.params;

        const user = await User.findByPk(id, {
            attributes: { exclude: ['password'] }
        });

        if (!user) {
            return res.status(404).json({ success: false, message: 'Team member not found' });
        }

        res.json({ success: true, member: user });
    } catch (error) {
        console.error('Get team member error:', error);
        res.status(500).json({ success: false, message: 'Server error fetching team member' });
    }
};

export const updateTeamMember = async (req, res) => {
    try {
        const { id } = req.params;
        const updates = req.body;

        const user = await User.findByPk(id);
        if (!user) {
            return res.status(404).json({ success: false, message: 'Team member not found' });
        }

        // Check if trying to change role from Admin
        if (updates.role && user.role === 'Admin' && updates.role !== 'Admin') {
            // Check if this is the last admin
            const adminCount = await User.count({ where: { role: 'Admin', status: 'Active' } });
            if (adminCount <= 1) {
                return res.status(400).json({ 
                    success: false, 
                    message: 'Cannot change role of the last active admin' 
                });
            }
        }

        // Check email uniqueness if email is being updated
        if (updates.email && updates.email !== user.email) {
            const existingUser = await User.findOne({ where: { email: updates.email.toLowerCase() } });
            if (existingUser) {
                return res.status(400).json({ success: false, message: 'Email already in use' });
            }
        }

        await user.update(updates);

        const userResponse = user.toJSON();
        delete userResponse.password;

        res.json({ success: true, member: userResponse });
    } catch (error) {
        console.error('Update team member error:', error);
        res.status(500).json({ success: false, message: 'Server error updating team member' });
    }
};

export const deactivateTeamMember = async (req, res) => {
    try {
        const { id } = req.params;

        const user = await User.findByPk(id);
        if (!user) {
            return res.status(404).json({ success: false, message: 'Team member not found' });
        }

        // Check if trying to deactivate the last admin
        if (user.role === 'Admin' && user.status === 'Active') {
            const adminCount = await User.count({ where: { role: 'Admin', status: 'Active' } });
            if (adminCount <= 1) {
                return res.status(400).json({ 
                    success: false, 
                    message: 'Cannot deactivate the last active admin' 
                });
            }
        }

        await user.update({ status: 'Inactive' });

        const userResponse = user.toJSON();
        delete userResponse.password;

        res.json({ success: true, member: userResponse });
    } catch (error) {
        console.error('Deactivate team member error:', error);
        res.status(500).json({ success: false, message: 'Server error deactivating team member' });
    }
};

export const deleteTeamMember = async (req, res) => {
    try {
        const { id } = req.params;

        const user = await User.findByPk(id);
        if (!user) {
            return res.status(404).json({ success: false, message: 'Team member not found' });
        }

        // Check if trying to delete the last admin
        if (user.role === 'Admin') {
            const adminCount = await User.count({ where: { role: 'Admin' } });
            if (adminCount <= 1) {
                return res.status(400).json({ 
                    success: false, 
                    message: 'Cannot delete the last admin' 
                });
            }
        }

        await user.destroy();

        res.json({ success: true, message: 'Team member deleted successfully' });
    } catch (error) {
        console.error('Delete team member error:', error);
        res.status(500).json({ success: false, message: 'Server error deleting team member' });
    }
};

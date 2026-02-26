import jwt from 'jsonwebtoken';

// Mock users database
const users = [
    { id: 1, email: 'user@example.com', password: 'password123', role: 'user', name: 'Regular User' },
    { id: 2, email: 'manager@example.com', password: 'password123', role: 'manager', name: 'Manager User' },
    { id: 3, email: 'admin@example.com', password: 'password123', role: 'admin', name: 'Admin User' },
    { id: 4, email: 'developer@example.com', password: 'password123', role: 'developer', name: 'Developer User' }
];

export const login = (req, res) => {
    const { email, password } = req.body;

    try {
        // Find user
        const user = users.find(u => u.email === email);

        if (!user) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // Check password (in a real app, use bcrypt)
        if (user.password !== password) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // Generate token
        const token = jwt.sign(
            { id: user.id, role: user.role, email: user.email },
            process.env.JWT_SECRET || 'fallback_secret_key',
            { expiresIn: '1d' }
        );

        // Return user info and token
        res.json({
            token,
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                role: user.role
            }
        });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ message: 'Server error during login' });
    }
};

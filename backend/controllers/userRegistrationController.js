const bcrypt = require('bcryptjs');
const User = require('../models/User');
const Tenant = require('../models/Tenant');

exports.registerUser = async (req, res) => {
    try {
        const { name, email, password, domain } = req.body;

        if (!name || !email || !password || !domain) {
            return res.status(400).json({ message: 'Missing required fields' });
        }

        const cleanDomain = domain.toLowerCase().trim();

        const tenant = await Tenant.findOne({ domain: cleanDomain });
        if (!tenant) {
            return res.status(404).json({ message: 'Tenant with this domain not found' });
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'Email already registered' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            name,
            email,
            password: hashedPassword,
            role: 'User',
            tenantId: tenant._id,
            authProvider: 'local',
        });

        return res.status(201).json({
            message: 'User registered successfully',
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                tenantId: user.tenantId,
            },
        });
    } catch (error) {
        console.error('Register user error:', error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
};

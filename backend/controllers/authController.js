const bcrypt = require('bcryptjs');
const User = require('../models/User');
const Tenant = require('../models/Tenant');
const generateToken = require('../middlewares/generateToken');

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const clientDomain = req.headers['x-tenant-domain'];

        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ message: 'Invalid credentials' });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

        const token = generateToken(user);

        if (['Admin', 'User'].includes(user.role) && user.tenantId) {
            const tenant = await Tenant.findById(user.tenantId);

            if (!tenant) {
                return res.status(400).json({ message: 'Tenant not found' });
            }

            if (tenant.domain !== clientDomain) {
                return res.status(403).json({ message: 'Invalid login domain' });
            }
        }

        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 7 * 24 * 60 * 60 * 1000,
        });

        res.json({
            user: {
                id: user._id,
                name: user.name,
                role: user.role,
                email: user.email,
            }
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
};

exports.getCurrentUser = async (req, res) => {
    try {
        if (!req.user) {
            return res.status(401).json({ message: 'Unauthorized' });
        }

        res.json({
            user: {
                id: req.user._id,
                name: req.user.name,
                email: req.user.email,
                role: req.user.role,
            },
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
};

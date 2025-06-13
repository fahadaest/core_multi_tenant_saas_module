const Tenant = require('../models/Tenant');
const User = require('../models/User');

exports.getAllTenantsAndUsers = async (req, res) => {
    try {
        const currentUser = req.user;

        if (!currentUser || currentUser.role !== 'SuperAdmin') {
            return res.status(403).json({ message: 'Access denied' });
        }

        const tenants = await Tenant.find({}).select('-__v');
        const users = await User.find({}).select('-password -__v');

        res.json({ tenants, users });
    } catch (error) {
        console.error('Error fetching tenants and users:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

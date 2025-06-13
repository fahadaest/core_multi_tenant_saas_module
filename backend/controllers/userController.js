const User = require('../models/User');

exports.getTenantUsers = async (req, res) => {
    try {
        const currentUser = req.user;

        if (!currentUser) {
            return res.status(403).json({ message: 'Unauthorized' });
        }

        let query = { role: 'User' };

        if (currentUser.role !== 'SuperAdmin') {
            if (!currentUser.tenantId) {
                return res.status(403).json({ message: 'Missing tenant info' });
            }
            query.tenantId = currentUser.tenantId;
        }

        const users = await User.find(query).select('-password -tenantId -_id');
        res.json(users);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
};

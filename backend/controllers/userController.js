const User = require('../models/User');

exports.getTenantUsers = async (req, res) => {
    try {
        const currentUser = req.user;
        console.log(currentUser)

        if (!currentUser || !currentUser.tenantId) {
            return res.status(403).json({ message: 'Unauthorized or missing tenant info' });
        }

        const users = await User.find({
            role: 'User',
            tenantId: currentUser.tenantId,
        }).select('-password -tenantId -_id');

        res.json(users);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
};

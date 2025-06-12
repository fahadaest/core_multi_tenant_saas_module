const bcrypt = require('bcryptjs');
const Tenant = require('../models/Tenant');
const User = require('../models/User');

exports.registerTenant = async (req, res) => {
    try {
        const { companyName, companyEmail, domain, industry, password } = req.body;

        const existing = await Tenant.findOne({ domain });
        if (existing) return res.status(400).json({ message: 'Domain already taken' });

        const tenant = await Tenant.create({
            name: companyName,
            email: companyEmail,
            domain,
            industry,
        });

        // Create Admin user
        const hashedPassword = await bcrypt.hash(password, 10);
        await User.create({
            name: `${companyName} Admin`,
            email: companyEmail,
            password: hashedPassword,
            role: 'Admin',
            tenantId: tenant._id,
            authProvider: 'local',
        });

        return res.status(201).json({ message: 'Tenant registered successfully' });
    } catch (error) {
        console.error('Register tenant error:', error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
};

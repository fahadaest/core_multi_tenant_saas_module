const { OAuth2Client } = require('google-auth-library');
const User = require('../models/User');
const Tenant = require('../models/Tenant');
const generateToken = require('../middlewares/generateToken');

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

exports.googleSignup = async (req, res) => {
    try {
        const { tokenId, domain } = req.body;

        if (!tokenId || !domain) {
            return res.status(400).json({ message: 'Token ID and domain are required' });
        }

        const ticket = await client.verifyIdToken({
            idToken: tokenId,
            audience: process.env.GOOGLE_CLIENT_ID,
        });

        const payload = ticket.getPayload();
        const { sub: googleId, email, name } = payload;

        const tenant = await Tenant.findOne({ domain: domain.toLowerCase().trim() });
        if (!tenant) {
            return res.status(404).json({ message: 'Tenant with this domain not found' });
        }

        let user = await User.findOne({ $or: [{ googleId }, { email }], tenantId: tenant._id });

        if (!user) {
            user = await User.create({
                name,
                email,
                googleId,
                role: 'User',
                tenantId: tenant._id,
                authProvider: 'google',
            });
        }

        const token = generateToken(user);

        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 7 * 24 * 60 * 60 * 1000,
        });

        return res.status(200).json({
            user: {
                id: user._id,
                name: user.name,
                role: user.role,
                email: user.email,
            },
        });
    } catch (error) {
        console.error('Google signup error:', error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
};

const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: String,
    email: { type: String, unique: true },
    password: String,
    role: { type: String, enum: ['SuperAdmin', 'Admin', 'User'], required: true },
    tenantId: { type: mongoose.Schema.Types.ObjectId, ref: 'Tenant', default: null },
    authProvider: { type: String, enum: ['local', 'google', 'microsoft'], default: 'local' },
    createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('User', userSchema);
const mongoose = require('mongoose');

const tenantSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    domain: { type: String, required: true, unique: true },
    industry: { type: String },
    createdAt: { type: Date, default: Date.now },
});

const Tenant = mongoose.model('Tenant', tenantSchema);

module.exports = Tenant;

const mongoose = require('mongoose');

const tenantConnections = {};

const getTenantDb = (tenantName) => {
    if (tenantConnections[tenantName]) {
        return tenantConnections[tenantName];
    }

    const uri = `mongodb://localhost:27017/${tenantName}-db`;

    const connection = mongoose.createConnection(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });

    tenantConnections[tenantName] = connection;
    return connection;
};

module.exports = getTenantDb;
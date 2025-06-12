const getTenantDb = require('../config/tenantDb');

const tenantMiddleware = (req, res, next) => {
    const host = req.headers.host;
    const subdomain = host.split('.')[0];

    req.tenantName = subdomain;
    req.db = getTenantDb(subdomain);
    next();
};

module.exports = tenantMiddleware;

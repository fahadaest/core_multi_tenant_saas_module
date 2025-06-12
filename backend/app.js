const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const authRoutes = require('./routes/authRoutes');
const tenantRoutes = require('./routes/tenantRoutes');
const tenantMiddleware = require('./middlewares/tenantMiddleware');

const app = express();

app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }));
app.use(express.json());
app.use(cookieParser());

app.use(tenantMiddleware);

app.use('/api/auth', authRoutes);
app.use('/api/tenants', tenantRoutes);

module.exports = app;

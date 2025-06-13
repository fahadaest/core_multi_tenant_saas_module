const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const authRoutes = require('./routes/authRoutes');
const tenantRoutes = require('./routes/tenantRoutes');
const userRoutes = require('./routes/userRoutes');
const getAllTenantsAndUsersRoute = require('./routes/getAllTenantsAndUsersRoute');
const userRegistrationRoutes = require('./routes/userRegistrationRoutes');
const googleAuthRoutes = require('./routes/googleAuthRoutes');

const app = express();

app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }));
app.use(express.json());
app.use(cookieParser());

app.use('/api/auth', authRoutes);
app.use('/api/tenants', tenantRoutes);
app.use('/api/auth', userRoutes);
app.use('/api/auth', getAllTenantsAndUsersRoute);
app.use('/api', userRegistrationRoutes);
app.use('/auth', googleAuthRoutes);

module.exports = app;

module.exports = (requiredRole) => {
    return (req, res, next) => {
        if (req.user.role !== requiredRole) return res.sendStatus(403);
        next();
    };
};

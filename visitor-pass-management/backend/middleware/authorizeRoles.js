const authorizeRoles = (roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)){
            return res.status(403).json({
                error: 'Access denied. You do not have permission to perform this action.'
            })
        }

        next();
    }
}

module.exports = authorizeRoles;
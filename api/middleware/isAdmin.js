// middleware/isAdmin.js

function isAdmin(req, res, next) {
  // Check if the user has admin role
  if (req.role !== 'admin') {
      return res.status(403).json({ msg: 'Unauthorized, admin access required' });
  }

  // Continue with the next middleware
  next();
}

module.exports = isAdmin;

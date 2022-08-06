const jwt = require('jsonwebtoken');

const verify_toke = (req, res, next) => {
  const token = req.headers.authorization.split(' ')[1];
  try {
    const decoded = jwt.verify(token, 'PET_SECRET');
    if (decoded.user_id) {
      next();
    } else {
      res.json({ message: 'Invalid token' });
    }
  } catch (err) {
    res.json({ message: 'Invalid token' });
  }
};

module.exports = {
  verify_toke,
};

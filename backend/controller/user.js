const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../model/user');

const login = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (user) {
      const is_password_same = await bcrypt.compare(password, user.password);
      if (is_password_same) {
        const token = jwt.sign({
          user_id: user._id, full_name: user.full_name, email: user.email, phone_number: user.phone,
        }, 'PET_SECRET');
        res.status(200).json({ token });
      } else {
        res.status(404).json({ message: 'Email and/or password is incorrect.' });
      }
    } else {
      res.status(404).json({ message: 'Email and/or password is incorrect.' });
    }
  } catch (err) {
    next(err);
  }
};

const signup = async (req, res, next) => {
  const {
    email, password, full_name, phone_number,
  } = req.body;
  try {
    const exUser = await User.findOne({ email });
    if (!exUser) {
      const salt = await bcrypt.genSalt(10);
      const hash_password = await bcrypt.hash(password, salt);
      const user = await User.create({
        email, password: hash_password, full_name, phone_number,
      });
      const token = jwt.sign({
        user_id: user._id, full_name: user.full_name, email: user.email, phone_number: user.phone,
      }, 'PET_SECRET');
      res.status(200).json({ token });
    } else {
      res.status(409).json({ message: 'A user with same email already exists.' });
    }
  } catch (err) {
    next(err);
  }
};

module.exports = {
  login,
  signup,
};

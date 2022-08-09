const express = require('express');
const multer = require('multer');
const {
  get_all_pets, add_pets, get_one_pet,
  toggle_available, get_pets_by_user,
} = require('../controller/pet');
const { verify_toke } = require('../middleware/verify_token');

const router = express.Router();

const FILE_TYPES = {
  'image/png': 'png',
  'image/jpg': 'jpg',
  'image/jpeg': 'jpeg',
};

const uploadImage = multer({
  storage: multer.memoryStorage(),
  // eslint-disable-next-line consistent-return
  fileFilter: (_req, file, cb) => {
    if (!FILE_TYPES[file.mimetype]) {
      return cb(new Error('file is not allowed'));
    }

    cb(null, true);
  },
});

router.get('/search', verify_toke, get_all_pets);
router.get('/:id', verify_toke, get_one_pet);
router.post('', uploadImage.array('image', 3), verify_toke, add_pets);
router.patch('/:id', verify_toke, toggle_available);
router.get('/', verify_toke, get_pets_by_user);

module.exports = router;

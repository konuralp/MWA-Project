const Pet = require('../model/pet');

const get_all_pets = async (req, res, next) => {
  const query = {};
  const name = req.query.name ? req.query.name : null;
  query.push({ name });
  const category = req.query.category ? req.query.category : null;
  query.push({ category });
  const zip_code = req.query.zip_code ? req.query.zip_code : null;
  query.push({ zip_code });
  const latitude = req.query.latitude ? req.query.latitude : null;
  const longitude = req.query.longitude ? req.query.longitude : null;
  if (latitude && longitude) query.push({ $near: [longitude, latitude], $maxDistance: 1000 });
  query.push({ available: true });

  try {
    const pets = await Pet.find(query);
    res.json({ pets });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  get_all_pets,
};

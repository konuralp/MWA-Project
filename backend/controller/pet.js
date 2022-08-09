const { v4: uuidv4 } = require('uuid');
const { admin } = require('../firebase/firebase_initializer');
const Pet = require('../model/pet');

const storageRef = admin.storage().bucket(process.env.BUCKET_URL);

const get_all_pets = async (req, res, next) => {
  const { skip, limit } = req.query;
  let query = {};
  const breed = req.query.breed ? { breed: { $regex: new RegExp(req.query.breed, 'i') } } : null;
  query = { ...query, ...breed };
  const category = req.query.category ? { category: { $regex: new RegExp(req.query.category, 'i') } } : null;
  query = { ...query, ...category };
  const behaviors = req.query.behaviors ? { behaviors: { $regex: new RegExp(req.query.behaviors, 'i') } } : null;
  query = { ...query, ...behaviors };
  const size = req.query.size ? { size: req.query.size } : null;
  query = { ...query, ...size };
  const zip_code = req.query.zip_code ? { zip_code: req.query.zip_code } : null;
  query = { ...query, ...zip_code };
  const state = req.query.state ? { state: { $regex: new RegExp(req.query.state, 'i') } } : null;
  query = { ...query, ...state };
  const latitude = req.query.latitude ? req.query.latitude : null;
  const longitude = req.query.longitude ? req.query.longitude : null;
  if (latitude && longitude) {
    const location = {
      location:
      { $near: [parseFloat(longitude), parseFloat(latitude)] },
    };
    query = { ...query, ...location };
  }
  query = { ...query, available: true };

  try {
    const pets = await Pet.find(query).limit(limit || 10).skip(skip);
    res.json(pets);
  } catch (err) {
    next(err);
  }
};

const add_pets = async (req, res, next) => {
  const { user, files } = req;
  const {
    name, bio, category,
    gender, zip_code, state,
    breed, age, size, behaviors,
    latitude, longitude,
  } = JSON.parse(req.body.pet);
  const urls = [];

  await Promise.all(files.map(async (file) => {
    const orginalname = file.originalname;
    const extension = orginalname.split('.')[1];
    const fileName = storageRef.file(`profile_pictures/${Date.now()}.${extension}`);

    await fileName
      .save(file.buffer, {
        public: true,
        metadata: {
          firebaseStorageDownloadTokens: uuidv4(),
        },
      });

    const metaData = await fileName.getMetadata();
    const url = metaData[0].mediaLink;
    urls.push(url);
  }));
  try {
    await Pet.create({
      name,
      bio,
      category,
      gender,
      zip_code,
      state,
      breed,
      age,
      size,
      behaviors,
      location: [longitude, latitude],
      available: true,
      owner: {
        _id: user.user_id,
        full_name: user.full_name,
        email: user.email,
        phone_number: user.phone_number,
      },
      images: urls,
    });
    res.json({ message: 'Pets added successfully' });
  } catch (err) {
    next(err);
  }
};

const get_one_pet = async (req, res, next) => {
  const { id } = req.params;
  try {
    const pets = await Pet.findOne({ _id: id });
    res.json(pets);
  } catch (err) {
    next(err);
  }
};

const toggle_available = async (req, res, next) => {
  const { user } = req;
  const { id } = req.params;
  const { available } = req.body;
  try {
    const pets = await Pet.findOneAndUpdate(
      { _id: id, 'owner._id': user.user_id },
      { $set: { available } },
      { new: true },
    );
    res.json({ pets });
  } catch (err) {
    next(err);
  }
};

const get_pets_by_user = async (req, res, next) => {
  const { user } = req;
  try {
    const pets = await Pet.find(
      { 'owner._id': user.user_id },
    );
    res.json({ pets });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  get_all_pets,
  add_pets,
  get_one_pet,
  toggle_available,
  get_pets_by_user,
};

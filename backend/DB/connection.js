const mongoose = require('mongoose');

module.exports = {
  dbConnect: async () => {
    const uri = process.env.DATABASE_URL;

    try {
      mongoose.connect(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      console.log('DB connected');
    } catch (err) {
      throw Error(err);
    }
  },
};

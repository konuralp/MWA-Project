const firebaseAdmin = require('firebase-admin');

const serviceAccount = require('./pet-adoption-f2ba2-firebase-adminsdk-dicz6-7a3a566d1f.json');

const admin = firebaseAdmin.initializeApp({
  credential: firebaseAdmin.credential.cert(serviceAccount),
});

module.exports = {
  admin,
};

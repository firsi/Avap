// import { initializeApp, applicationDefault } from 'firebase-admin/app';

var admin = require("firebase-admin");

var serviceAccount = require("../service-account-key.json");



if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
  });
}

export default admin

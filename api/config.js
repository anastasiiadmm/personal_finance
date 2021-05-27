const path = require('path');
const rootPath = __dirname;

module.exports = {
  rootPath,
  uploadPath: path.join(rootPath, 'public/uploads'),
  google: {
    clientId: process.env.GOOGLE_CLIENT_ID,
  },
  secret: process.env.TOKEN_SECRET
};




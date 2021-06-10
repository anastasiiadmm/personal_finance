const {Token, User} = require('../models');
const geoip = require('geoip-lite');


const auth = async (req, res, next) => {
  const authToken = req.get('Authorization');

  if (!authToken) {
    return res.status(401).send({error: 'No token password'});
  }

  const token = await Token.findOne({
    where: {
      token: authToken,
      location: req.ip === '::1' ? geoip.lookup('92.62.73.100').country : geoip.lookup(req.ip).country,
      device: req.headers['user-agent'],
    }, include: {model: User, as: 'user'}
  });

  if (!token) {
    return res.status(401).send({error: 'Wrong token'});
  }
  if (token.expirationDate.getTime() < new Date().getTime()) {
    return res.status(401).send({error: 'Outdated token'});
  }

  req.user = token.toJSON().user;

  next();
};

module.exports = auth;

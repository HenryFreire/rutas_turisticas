var jwt = require('jsonwebtoken');
var token_config = require('../../config/jwt');
module.exports = function (req, res, next) {
  var cabeceras = req.headers;
  if (cabeceras.authorization) {
    var token = cabeceras.authorization.replace('bearer ', '');
    jwt.verify(token, token_config.secreto, function (err, token) {
      if (err) return res.forbidden({mensaje: 'No es un token valido'});
      return next();
    });
  } else {
    return res.forbidden({mensaje: 'No envia cabecera de autorizacion'})
  }
};

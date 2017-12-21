var Util = require('machinepack-util');
var jwt = {
  secreto: Util.hash({
    value: new Date().getUTCDate() + Math.floor((Math.random() * 100000000) + 1),
  }).execSync(),
  expiraToken: Math.floor(Date.now() / 1000) + (60 * 60 * 24 * 7)
}
module.exports = jwt;

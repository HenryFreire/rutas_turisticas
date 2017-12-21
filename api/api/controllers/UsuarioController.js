/**
 * UsuarioController
 *
 * @description :: Server-side logic for managing Usuarios
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
var Passwords = require('machinepack-passwords');
var jwt = require('jsonwebtoken');
var token_config = require('../../config/jwt');
module.exports = {
  login : function( req , res) {
    var params = req.allParams(),
      email = params.email,
      password = params.password;
    if( email && password && req.method=='POST' ) {
      Usuario.findOne({
        email: email
      }).exec(function( err , usuario ){
        if( err ) return res.serverError({status:500, msg:'Error en el servidor', err});
        if( !usuario ) {
          return res.notFound({status:404,msg:'Usuario no encontrado'})
        }else {
          Passwords.checkPassword({
            passwordAttempt: password,
            encryptedPassword: usuario.password,
          }).exec({
            error: function( error ) {
              return res.serverError({status:500, msg:'Error en el servidor', error});
            },incorrect: function () {
              return res.badRequest({status:401, msg:'password incorrecto'})
            },success : function() {
              var token = jwt.sign({
                  exp:token_config.expiraToken,
                  data: {
                    id:usuario.id,
                    usuario:usuario.email
                  }
                },
                token_config.secreto);
              return res.ok({token:token, email: usuario.email});
            }
          })
        }
      });
    }else {
      return res.badRequest({mensaje:"No envia usuario ni password"});
    }
  }
};


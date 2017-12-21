/**
 * Usuario.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */
var Passwords = require('machinepack-passwords');
module.exports = {

  attributes: {
    cedula: {
      type: 'string',
      unique: true,
      required: true
    },
    nombre: {
      type: 'string',
      required: true
    },
    email: {
      type: 'string',
      unique: true,
      required: true
    },
    password : {
      type: 'string',
      required: true
    }
  },

  // Antes de crear el usuario encrypta la contraseña
  beforeCreate: function ( usuario , callback  )  {
    Passwords.encryptPassword({
      password: usuario.password
    }).exec({
      error: function( err ){
        callback('Erro al crear el usuario', err);
      },success: function( hashedPassword ) {
        usuario.password = hashedPassword;
        callback();
      }
    })
  }


};


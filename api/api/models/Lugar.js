/**
 * Lugar.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    id : {
      type: 'string',
      primaryKey: true,
      unique: true,
      autoIncrement: true
    },
    nombre: {
      type: 'string',
      required: true
    },
    descripcion: {
      type:'string',
      required: true
    },
    categoria: {
      type: 'string',
      required: true,
      enum: ['museo', 'plaza', 'parque', 'monumento', 'institucion']
    },
    direccion: {
      type:'string',
      required: true
    },
    lat: {
      type: 'float',
      required: true
    },
    lng: {
      type:'float',
      required: true
    },
    fotoUrl: {
      type: 'string',
      required : true
    },
    nombreImagen: {
      type: 'string',
      required: true
    },
    visitas: {
      type: 'integer',
      defaultsTo: 0
    }


  }
};


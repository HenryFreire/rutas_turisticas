/**
 * LugarController
 *
 * @description :: Server-side logic for managing lugars
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
var request = require('request');
var fs = require('fs');
var urlServidorImagen = 'http://localhost:1337/imagenes/'
module.exports = {

  subirFoto: function(req,res){
    if(req.method == 'POST'){
      var body = req.allParams();
      var archivo = req.file('imagen');
      var mime = archivo._files[0].stream.headers['content-type'];
      if(mime === 'image/jpeg' || mime === 'image/png'){
        console.log('si es una imagen');
        archivo.upload({
          dirname: require('path').resolve(sails.config.appPath, 'assets/imagenes')
        }, function whenDone(err, uploadedFiles){
          if (err) return res.serverError(err);
          if (uploadedFiles.length === 0){
            return res.badRequest('No se subio la imagen');
          }
          var primerSplit= (uploadedFiles[0].fd).split("\\");
          var segundoSplit = primerSplit[primerSplit.length-1].split('/');
          var hashImagen = segundoSplit[segundoSplit.length-1];
          return res.ok({satus:201, msg:'imagen guardada', hashImagen: hashImagen })
        });
      }
    }
  },

  guardarLugar: function(req, res) {
    if(req.method == 'POST') {
      var body = req.allParams();
      console.log('llego esto mira ', body);
      // google maps
      var options = {
        url     : 'http://maps.google.com/maps/api/geocode/json?address=' + body.direccion,
        method  : 'GET'
      };

      request(options, function (error, response, mapa) {
        if (!error && response.statusCode == 200) {
          var cordenada = JSON.parse(mapa);
          var lat = (cordenada.results.length > 0)? cordenada.results[0].geometry.location.lat : 0 ;
          var lng = (cordenada.results.length > 0)? cordenada.results[0].geometry.location.lng: 0;
          Lugar.create({
            nombre: body.nombre,
            descripcion: body.descripcion,
            categoria: body.categoria,
            direccion: body.direccion,
            lat: lat,
            lng: lng,
            fotoUrl: urlServidorImagen + body.nombreImagen,
            nombreImagen: body.nombreImagen
          }).exec(function (error, lugar) {
            if(error) {
              console.log('Ocurrio un error', error);
              return res.negotiate(error);
            }
            console.log('creado: ', lugar);
            console.log(lat,' ', lng);
            return res.ok(lugar);
          })
        }
      });


    }
  },



  actualizarLugar: function(req, res) {
    if(req.method == 'POST'){
      var body = req.allParams();
      var options = {
        url     : 'http://maps.google.com/maps/api/geocode/json?address=' + body.direccion,
        method  : 'GET',
      };
      request(options, function (error, response, mapa) {
        if (!error && response.statusCode == 200) {
          var cordenada = JSON.parse(mapa)
          var lat = (cordenada.results.length > 0)? cordenada.results[0].geometry.location.lat : 0 ;
          var lng = (cordenada.results.length > 0)? cordenada.results[0].geometry.location.lng: 0;
          Lugar.update({id : body.id},{
            nombre: body.nombre,
            descripcion: body.descripcion,
            categoria: body.categoria,
            direccion: body.direccion,
            lat: lat,
            lng: lng
          }).exec(function (error, lugar) {
            if(error) {
              console.log('Ocurrio un error', error);
              return res.negotiate(error);
            }
            console.log('actualizado: ', lugar);
            return res.ok(lugar);
          })
        }
      });

    }

  },
  buscarPorId : function (req, res){
    var params = req.allParams();
    console.log(params.id);
    Lugar.findOne({
      id: params.id
    }).exec(function (err, lugar){
      if (err) return res.serverError(err);
      console.log('lugar ', lugar)
      return res.ok(lugar);
    });
  },

  eliminar:function (req,res) {
    var params= req.allParams();
    if(params.id){
      var pathImagen = 'assets/imagenes/'+params.nombreImagen;
      fs.unlink(pathImagen, function(err) {
        if (err) return console.log(err);
        Lugar.destroy({id: params.id})
          .exec(function (err, lugarEliminado) {
            if(err) return res.negotiate(err);
            console.log('eliminado');
            return res.ok({status:200,msg:'eliminado'});
          })
      });
    }else{
      console.log('faltan los parametros');
      return res.badRequest('no envia identificador')
    }
  }
};



/**
 * LugarController
 *
 * @description :: Server-side logic for managing lugars
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
var request = require('request');
module.exports = {


  subir:function (req,res) {
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
           // google maps
           console.log(body.direccion)
           var options = {
             url     : 'http://maps.google.com/maps/api/geocode/json?address=' + body.direccion,
             method  : 'GET',
           }
           request(options, function (error, response, mapa) {
             if (!error && response.statusCode == 200) {
               var cordenada = JSON.parse(mapa)
               var lat = cordenada.results[0].geometry.location.lat;
               var lng = cordenada.results[0].geometry.location.lng;
               Lugar.create({
                nombre: body.nombre,
                descripcion: body.descripcion,
                categoria: body.categoria,
                direccion: body.direccion,
                lat: 0.25456,
                lng: 0.2485748,
                fotoUrl: 'http://localhost:1337/imagenes/'+hashImagen
              }).exec(function (error, lugar) {
                if(error) {
                  console.log('Ocurrio un error', error);
                  return res.negotiate(error);
                }
                console.log('creado: ', lugar)
                return res.ok(lugar);
              })
             }
           });
         });
       }
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
  }
};



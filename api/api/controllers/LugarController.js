/**
 * LugarController
 *
 * @description :: Server-side logic for managing lugars
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
var request = require('request');
var fs = require('fs');
var fsy = require('file-system');
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
          var nombreImagen='';
          var primerSplit= (uploadedFiles[0].fd).split("\\");
          var segundoSplit = primerSplit[primerSplit.length-1].split('/');
          var hashImagen = segundoSplit[segundoSplit.length-1];
          var aux = (uploadedFiles[0].filename).split(".");
          nombreImagen = aux[0];

          console.log('upload file es ', uploadedFiles[0].fd);
          console.log('split de upload file', primerSplit);



          console.log('aux: ', aux);


          fs.exists('assets/imagenes/'+hashImagen, function (exists)  {
            if(exists){
              console.log('existe: ', exists)
              return res.ok({ msg:'creado: '+ exists, nombreImagen:hashImagen  })
            }else{
              console.log('no existe: ', exists)
            }
          });
        });
      }
    }
  },

  getLugares: function(req, res) {
    Lugar.find().exec(function (err, lugares) {
      if(err){
        return res.negotiate(err)
      }else{
        return res.ok(lugares)
      }
    })
  },

  guardarLugar: function(req, res) {
    if(req.method == 'POST') {
      var body = req.allParams();
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
          var pathImagen = 'assets/imagenes/'+body.nombreImagen;
          fs.readFile(pathImagen, 'base64', function(err, data){
            if(err){
              console.log('Ocurrio un error', err);
              return res.negotiate({msg: err})
            }else{
              console.log('se tiene la data: ');
              Lugar.create({
                nombre: body.nombre,
                descripcion: body.descripcion,
                categoria: body.categoria,
                direccion: body.direccion,
                lat: lat,
                lng: lng,
                fotoUrl: data,
                nombreImagen: body.nombreImagen
              }).exec(function (error, lugar) {
                if(error) {
                  console.log('Ocurrio un error', error);
                  return res.negotiate(error);
                }
                console.log('creado');
                console.log(lat,' ', lng);
                return res.ok(lugar);
              })
            }
          });

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
          }).exec(function (err, lugar) {
            if(error) {
              console.log('Ocurrio un error', err);
              return res.negotiate(err);
            }
            console.log('actualizado ');
            return res.ok(lugar);
          })
        }else {
          return res.negotiate(error);
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
      console.log('encontrado ')
      return res.ok(lugar);
    });
  },

  eliminar:function (req,res) {
    var params= req.allParams();
    console.log(params.id,' nombre ', params.nombreImagen);
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
  },

  contarVisita: function(req, res){
    var params= req.allParams();
    console.log(params.id )
    var contarMasUno = params.visitas + 1;
    Lugar.update({id: params.id},{visitas: contarMasUno}).exec(function(error, resultado){
      if(error) res.badRequest(error);
      res.ok(resultado);
    });
  },

  masPopulares: function(req, res){
    Lugar.find({
      sort: 'visitas DESC',
      limit: 5
    }).exec(function(err, fin){
      if(err) res.badRequest(err);
      res.ok(fin);
    })
  },

  categoria: function(req, res){
    var params = req.allParams();
    console.log('Pidio por: ', params.categoria);
    Lugar.find({
      categoria: params.categoria
    }).exec(function(err, fin){
      if(err) res.badRequest(err);
      res.ok(fin);
    })
  }

};



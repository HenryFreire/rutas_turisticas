import {Component, OnInit} from "@angular/core";
import {FileItem, FileUploader} from "ng2-file-upload";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Lugares} from "../clases/lugar.clase";
import {LugaresServicioComponent} from "../servicios/lugares.servicio.component";
import {ToasterService} from "angular2-toaster/src/toaster.service";

@Component({
  selector: 'app-lugar',
  templateUrl: './lugar.crear.component.html',
  styleUrls: ['./lugar.crear.component.css']
})
export class LugarComponent implements  OnInit{
  fileUploader: FileUploader;
  lugarForm: FormGroup;
  lugar = new Lugares('','','','');

constructor(private _fb: FormBuilder, private lugaresServicio: LugaresServicioComponent, private mensajeria: ToasterService){}
  public uploader:FileUploader = new FileUploader({
    url: 'http://localhost:1337/Lugar/subirFoto',
    itemAlias: 'imagen',
    authToken: localStorage.getItem('token'),
  });


guardar(){
  this.uploader.uploadAll();
  this.uploader.onCompleteItem = (item: FileItem, ftpResponse: any, status: number, headers:any) => {
    var server = JSON.parse(ftpResponse);
    this.lugar = this.lugarForm.value;
    console.log(ftpResponse);
    this.lugar.nombreImagen = server.hashImagen;
    console.log('nuevo item ', this.lugar)
    this.lugaresServicio.crearLugar(this.lugar)
      .subscribe((res)=>{
        console.log('guardando..', this.lugar)
        this.mensajeria.pop('success', 'Ok','Lugar creado');
        this.lugarForm.reset();
      }, (error)=> {
        console.log('hoho: ', error);
        this.mensajeria.pop('error', 'Error','Intentelo luego');
      });


  };

}

  ngOnInit(){
    this.lugarForm = this._fb.group({
      key: [0],
      operation: 'insert',
      nombre: [this.lugar.nombre, [Validators.required]],
      descripcion: [this.lugar.descripcion, [Validators.required]],
      categoria: [this.lugar.categoria, [Validators.required]],
      direccion: [this.lugar.direccion, [Validators.required]],
      imagen: ['']
    })
  }
}

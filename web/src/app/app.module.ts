import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {LugarComponent} from "./crear/lugar.crear.component";
import {RouterModule, Routes} from "@angular/router";
import {LugarActualizarComponent} from "./actualizar/lugar.actualizar.component";
import { AgmCoreModule } from '@agm/core';
import {LugaresListaComponent} from "./lugares/lugares.lista.component";
import {LugaresServicioComponent} from "./servicios/lugares.servicio.component";
import {HttpModule} from "@angular/http";
import {NgxPaginationModule} from "ngx-pagination";
import {LugaresFiltro} from "./pipe/filtro.nombre.pipe";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MomentModule} from "angular2-moment";
import {LoginComponent} from "./login/login.component";
import {AutentificacionServicioComponent} from "./servicios/Autentificacion.servicio.component";
import {GuardiaServicioComponent} from "./servicios/guardia.servicio.component";
import {PanelComponent} from "./panel/panel.component";
import {FileUploadModule} from "ng2-file-upload";
import { ToasterModule } from 'angular2-toaster';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {VerLugarComponent} from "./verLugar/ver.lugar.component";
const appRoutes: Routes = [
  {path: '', component: LoginComponent},
  {path: 'panel', component:PanelComponent, canActivate: [GuardiaServicioComponent],
    children:[
      {path: 'crear', component: LugarComponent},
      {path: 'actualizar/:id', component: LugarActualizarComponent},
      {path: 'lugares', component: LugaresListaComponent },
      {path: 'ver/:id', component: VerLugarComponent}
    ]}

];
@NgModule({
  declarations: [
    AppComponent,
    LugarComponent,
    LugarActualizarComponent,
    LugaresListaComponent,
    LugaresFiltro,
    LoginComponent,
    PanelComponent,
    VerLugarComponent
  ],
  imports: [
    BrowserModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyDsh_vRFLfmdqk4gSFxARKulxrzCfBA4OU'
    }),
    RouterModule.forRoot(appRoutes,{ useHash: true }),
    HttpModule,
    NgxPaginationModule,
    FormsModule,
    ReactiveFormsModule,
    MomentModule,
    FileUploadModule,
    ToasterModule,
    BrowserAnimationsModule
  ],
  providers: [ LugaresServicioComponent, AutentificacionServicioComponent, GuardiaServicioComponent ],
  bootstrap: [AppComponent]
})
export class AppModule { }

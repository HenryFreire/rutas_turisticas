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
import {FormsModule} from "@angular/forms";
import {MomentModule} from "angular2-moment";
import {LoginComponent} from "./login/login.component";
import {AutentificacionServicioComponent} from "./servicios/Autentificacion.servicio.component";
import {GuardiaServicioComponent} from "./servicios/guardia.servicio.component";
import {PanelComponent} from "./panel/panel.component";
const appRoutes: Routes = [
  {path: '', component: LoginComponent},
  {path: 'panel', component:PanelComponent, canActivate: [GuardiaServicioComponent],
    children:[
      {path: 'crear', component: LugarComponent},
      {path: 'actualizar/:id', component: LugarActualizarComponent},
      {path: 'lugares', component: LugaresListaComponent }
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
    PanelComponent
  ],
  imports: [
    BrowserModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyDsh_vRFLfmdqk4gSFxARKulxrzCfBA4OU'
    }),
    RouterModule.forRoot(appRoutes),
    HttpModule,
    NgxPaginationModule,
    FormsModule,
    MomentModule
  ],
  providers: [ LugaresServicioComponent, AutentificacionServicioComponent, GuardiaServicioComponent ],
  bootstrap: [AppComponent]
})
export class AppModule { }

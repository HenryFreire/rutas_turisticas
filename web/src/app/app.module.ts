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
const appRoutes: Routes = [
  {path: '', component: LugaresListaComponent},
  {path: 'crear', component: LugarComponent},
  {path: 'actualizar/:id', component: LugarActualizarComponent}
];
@NgModule({
  declarations: [
    AppComponent,
    LugarComponent,
    LugarActualizarComponent,
    LugaresListaComponent,
    LugaresFiltro
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
  providers: [  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

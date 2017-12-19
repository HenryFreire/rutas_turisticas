import {Pipe, PipeTransform} from "@angular/core";
import {Lugares} from "../clases/lugar.clase";

@Pipe({
  name: 'filtroLugares'
})
export class LugaresFiltro implements PipeTransform {
  transform(value: Lugares[], filterBy: string): Lugares[] {
    filterBy = filterBy ? filterBy.toLocaleLowerCase() : null;
    return filterBy ? value.filter((lugar: Lugares) =>
      lugar.nombre.toLocaleLowerCase().indexOf(filterBy) !== -1) : value;
  };
}

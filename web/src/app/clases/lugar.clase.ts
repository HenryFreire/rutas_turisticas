export class Lugares {
  constructor(
    public nombre: string,
    public descripcion: string,
    public categoria: string,
    public direccion: string,
    public createdAt?: Date,
    public nombreImagen?: string,
    public fotoUrl?: string
  ){}
}

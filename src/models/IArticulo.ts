export interface IArticulo {
  codigoArticulo: string;
  descripcion: string;
  precio: number;
  precioConIsv: number;
  precioOferta: number | null;
  precioOfertaConIsv: number | null;
  imagenUrl: string | null;
}

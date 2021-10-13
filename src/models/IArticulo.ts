export interface IArticulo {
  codigoArticulo: string;
  descripcion: string;
  precioNormal: number;
  precioOferta: number ;
  precioAhorroMas: number ;
  precioCrediDiunsa: number ;
  cuotaCrediDiunsaNormal: number;
  cuotaCrediDiunsaVIP: number ;
  imagenUrl: string | null;
}

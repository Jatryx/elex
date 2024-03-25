import { Expedientes } from "./expedientes.model";

export interface Documentos {

    id: number,
    ruta: string,
    precio: number,
    nombreDocumento: string,
    descripcion: string,
    borrado: boolean,
    expedientes: Expedientes,
    archivoPdf: ArrayBuffer;
}

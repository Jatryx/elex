import { Expedientes } from "../modeloExpedientes/expedientes.model";

export interface Documentos {

    id: number,
    ruta: string,
    precio: number,
    nombreDocumento: string,
    descripcion: string,
    borrado: boolean,
    expediente: Expedientes,
    archivoPdf: ArrayBuffer;

}

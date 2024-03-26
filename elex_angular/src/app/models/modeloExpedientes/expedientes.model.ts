import { Actuaciones } from "../modeloActuaciones/actuaciones.model";
import { Documentos } from "../modeloDocumentos/documentos.model";
import { TipoExpediente } from "../modeloTipoExpediente/tipo-expediente.model";

export interface Expedientes {

    id: number,
    nig: string,
    fecha: Date,
    estado: string,
    opciones: string,
    descripcion: string,
    tipo: TipoExpediente,
    borrado: boolean,
    actuaciones: Actuaciones[],
    documentos: Documentos[],
}

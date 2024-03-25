import { Actuaciones } from "./actuaciones.model";
import { Documentos } from "./documentos.model";
import { TipoExpediente } from "./tipo-expediente.model";

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

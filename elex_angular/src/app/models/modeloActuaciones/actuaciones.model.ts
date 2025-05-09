import { Expedientes } from "../modeloExpedientes/expedientes.model";

export interface Actuaciones {

    id: number,
    observaciones: string,
    finalizado: boolean,
    fecha: Date,
    usuario: string,
    responsable1: string,
    responsable2: string,
    consejeria: string,
    borrado: boolean,
    expediente: Expedientes;

}

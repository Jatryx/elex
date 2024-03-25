import { Expedientes } from './expedientes.model';

export interface Actuaciones {

    id: number,
    observaciones: string,
    finalizada: boolean,
    fecha: Date,
    usuario: string,
    responsable1: string,
    responsable2: string,
    consejeria: string,
    borrado: boolean,
    expediente: Expedientes;
}

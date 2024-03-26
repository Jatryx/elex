import { Expedientes } from "../modeloExpedientes/expedientes.model";

export interface TipoExpediente {

    id: number;
    materia: string;
    borrado: boolean;
    expedientes: Expedientes[];
}

// Catálogos hardcodeados para el MVP (defendible por simplicidad).
// A futuro esto podría venir de una DB relacional o endpoint.

export const ROLES = [
    { id: 1, valor: "JEFE PRODUCTOR" },
    { id: 2, valor: "EMPLEADO PRODUCTOR" },
];

export const TIPOS_DOC = [
    { id: 1, valor: "DNI" },
    { id: 2, valor: "CUIT" },
    { id: 3, valor: "Pasaporte" },
];

// Helpers para mostrar el texto en UI desde el id
export function rolLabel(idRol) {
    return ROLES.find((r) => r.id === idRol)?.valor ?? "SIN_ROL";
}

export function tipoDocLabel(idTipoDoc) {
    return TIPOS_DOC.find((t) => t.id === idTipoDoc)?.valor ?? "SIN_TIPO_DOC";
}
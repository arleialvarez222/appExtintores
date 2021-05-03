export interface EmpleadoInterface {
  data: ReqEmpleado[];
}

interface ReqEmpleado{
   id: number,
   idEmpresa: string,
   nombre: string,
   apellido: string,
   direccion: string,
   telefono: number,
   email: string
}

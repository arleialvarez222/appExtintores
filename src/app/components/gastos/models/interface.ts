export interface GastoInterface {
  data: reqGasto[];
}

interface reqGasto {
  id:          number;
  descripcion: string;
  fecha:       string;
  cantidad:    number;
  total:       number;
}

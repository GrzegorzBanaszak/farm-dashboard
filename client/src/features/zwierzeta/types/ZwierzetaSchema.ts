import { ZwierzetaHealthStatus } from "./ZwierzetaHealthStatus";
import { ZwierzetaSpices } from "./ZwierzetaSpices";

export default interface ZwierzetaSchema {
  id: string;
  name: string;
  specie: ZwierzetaSpices | string;
  birthDate: Date | string;
  health: ZwierzetaHealthStatus | string;
  number: number;
}

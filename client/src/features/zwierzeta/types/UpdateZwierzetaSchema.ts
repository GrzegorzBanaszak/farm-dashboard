import { ZwierzetaHealthStatus } from "./ZwierzetaHealthStatus";
import { ZwierzetaSpices } from "./ZwierzetaSpices";

export default interface UpdateZwierzetaSchema {
  name: string;
  specie: ZwierzetaSpices;
  birthDate: string;
  health: ZwierzetaHealthStatus;
  number: number;
}

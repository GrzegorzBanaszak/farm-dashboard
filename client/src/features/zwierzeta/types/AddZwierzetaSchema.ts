import { ZwierzetaHealthStatus } from "./ZwierzetaHealthStatus";
import { ZwierzetaSpices } from "./ZwierzetaSpices";

export default interface AddZwierzetaSchema {
  name: string;
  specie: ZwierzetaSpices;
  birthDate: string | null;
  health: ZwierzetaHealthStatus | null;
  number: number;
}

import { ZwierzetaHealthStatus } from "./ZwierzetaHealthStatus";
import { ZwierzetaSpices } from "./ZwierzetaSpices";

export default interface AddZwierzetaSchema {
  name: string;
  specie: ZwierzetaSpices;
  birthDate?: Date | string;
  health?: ZwierzetaHealthStatus;
  number: number;
}

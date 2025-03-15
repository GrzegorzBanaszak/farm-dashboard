import { MachineCondition } from "./MachineCondition";

export default interface MaszynySchema {
  id: string;
  name: string;
  type: string;
  purchaseDate: Date | string;
  condition: MachineCondition;
}

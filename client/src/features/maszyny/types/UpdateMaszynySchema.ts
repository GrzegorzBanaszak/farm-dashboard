import { MachineCondition } from "./MachineCondition";

export default interface UpdateMaszynySchema {
  name: string;
  type: string;
  purchaseDate: string;
  condition: MachineCondition;
}

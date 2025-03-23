import { MachineCondition } from "./MachineCondition";

export default interface AddMaszynySchema {
  name: string;
  type: string;
  purchaseDate: string | null;
  condition: MachineCondition | null;
}

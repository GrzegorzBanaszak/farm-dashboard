import { MachineCondition } from "./MachineCondition";

export default interface MaszynyDetailSchema {
  id: string;
  name: string;
  type: string;
  purchaseDate: Date | string;
  condition: MachineCondition;
}

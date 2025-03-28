import PolaSchema from "@/features/pola/types/PolaSchema.1";
import { UprawyType } from "./UprawyType";

export default interface UprawyDetailSchema {
  id: string;
  type: UprawyType;
  plantedAt: string;
  harvestedAt: string | null;
  yield: number | null;
  field: PolaSchema;
}

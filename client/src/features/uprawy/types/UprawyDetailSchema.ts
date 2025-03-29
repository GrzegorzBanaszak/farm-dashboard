import PolaSchema from "@/features/pola/types/PolaSchema";
import { UprawyType } from "./UprawyType";

export default interface UprawyDetailSchema {
  id: string;
  type: UprawyType;
  plantedAt: string;
  harvestedAt: string | null;
  yield: number | null;
  field: PolaSchema;
}

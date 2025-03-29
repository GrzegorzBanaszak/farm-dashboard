import PolaSchema from "@/features/pola/types/PolaSchema";

export default interface UprawySchema {
  id: string;
  type: string;
  plantedAt: Date | string;
  harvestedAt: Date | string;
  yield: number;
  field: PolaSchema | null;
}

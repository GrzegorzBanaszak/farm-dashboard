import { UprawyType } from "./UprawyType";

export default interface UpdateUprawySchema {
  type: UprawyType;
  plantedAt: string;
  harvestedAt: string | null;
  yield: number | null;
  fieldId: string;
}

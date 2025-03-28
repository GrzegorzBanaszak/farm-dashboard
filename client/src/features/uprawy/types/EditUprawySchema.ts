import { UprawyType } from "./UprawyType";

export default interface EditUprawySchema {
  type: UprawyType;
  plantedAt: string;
  harvestedAt: string | null;
  yield: number | null;
  fieldId: string;
}

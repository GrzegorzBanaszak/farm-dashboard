import { UprawyType } from "./UprawyType";

export default interface AddUprawySchema {
  type: UprawyType;
  plantedAt: string;
  harvestedAt: string | null;
  yield: number | null;
  fieldId: string;
}

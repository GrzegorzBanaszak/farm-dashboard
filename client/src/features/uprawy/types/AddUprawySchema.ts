import { UprawyType } from "./UprawyType";

export default interface AddUprawySchema {
  type: UprawyType;
  plantedAt: Date | string;
  harvestedAt?: Date | string;
  yield?: number;
  fieldId: string;
}

import { UprawyType } from "./UprawyType";

export default interface UpdateUprawySchema {
  type: UprawyType;
  plantedAt: Date | string;
  harvestedAt?: Date | string;
  yield?: number;
  fieldId: string;
}

export default interface UprawySchemaWithoutField {
  id: string;
  type: string;
  plantedAt: Date | string;
  harvestedAt: Date | string;
  yield: number;
  isGrowing: boolean;
}

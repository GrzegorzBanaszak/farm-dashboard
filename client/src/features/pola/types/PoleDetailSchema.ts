import UprawySchemaWithoutField from "@/features/uprawy/types/UprawySchemaWithoutField";

export default interface PoleDetailSchema {
  id: string;
  name: string;
  size: number;
  location: string;
  currentCropGrowing?: UprawySchemaWithoutField | null;
  histroyCrops: Array<UprawySchemaWithoutField>;
}

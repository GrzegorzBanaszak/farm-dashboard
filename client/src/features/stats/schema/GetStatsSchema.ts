export default interface GetStatsSchema {
  machinesCount: number;
  animalsCount: number;
  thisYearYield: number;
  plantedFieldsCount: number;
  animalsByType: Record<string, CountType>;
  cropsByType: Record<string, CountType>;
}

export type CountType = {
  name: string;
  count: number;
};

import { z } from "zod";

// Definiowanie schematów Zod zgodnych z modelem Prisma
export const CropTypeSchema = z.enum([
  "PSZENICA",
  "ZIEMNIAK",
  "JECZMIEN",
  "KUKURYDZA",
  "RYZ",
  "SOJA",
  "OWIES",
  "ZYTNO",
  "PROSO",
  "BURAK",
]);
export const SpeciesSchema = z.enum([
  "KROWA",
  "OWCA",
  "SWINIA",
  "KOZA",
  "KURA",
  "INDYK",
  "KACZKA",
  "KON",
  "OSIOL",
  "KROLIK",
]);
export const MachineConditionSchema = z.enum([
  "NEW",
  "GOOD",
  "FAIR",
  "POOR",
  "BROKEN",
]);

// Schematy dla głównych modeli
export const FieldSchema = z.object({
  id: z.string(),
  name: z.string(),
  size: z.number(),
  location: z.string(),
  updatedAt: z.date(),
  crops: z
    .array(
      z.object({
        id: z.string(),
        type: CropTypeSchema,
        isGrowing: z.boolean(),
      })
    )
    .optional(),
});

export const AnimalSchema = z.object({
  id: z.string(),
  name: z.string(),
  specie: SpeciesSchema,
  birthDate: z.date(),
  number: z.number(),
});

export const MachineSchema = z.object({
  id: z.string(),
  name: z.string(),
  type: z.string(),
  condition: MachineConditionSchema,
  purchaseDate: z.date(),
});

export const CropSchema = z.object({
  id: z.string(),
  type: CropTypeSchema,
  plantedAt: z.date(),
  harvestedAt: z.date().optional(),
  yield: z.number().optional(),
  isGrowing: z.boolean(),
});

// Typy na podstawie schematów Zod
export type Field = z.infer<typeof FieldSchema>;
export type Animal = z.infer<typeof AnimalSchema>;
export type Machine = z.infer<typeof MachineSchema>;
export type Crop = z.infer<typeof CropSchema>;

// hooks/useFarmData.ts
import { useState, useEffect } from "react";
import { Machine, Animal, Field, Crop } from "./types";

export const useFarmData = () => {
  const [machines, setMachines] = useState<Machine[]>([]);
  const [animals, setAnimals] = useState<Animal[]>([]);
  const [fields, setFields] = useState<Field[]>([]);
  const [crops, setCrops] = useState<Crop[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        // W rzeczywistej aplikacji tutaj byłyby wywołania API
        // np. const machinesResponse = await fetch('/api/machines');

        // Przykładowe dane (można zastąpić rzeczywistymi danymi z API)
        const sampleMachines: Machine[] = [
          {
            id: "1",
            name: "Traktor John Deere",
            type: "Traktor",
            condition: "GOOD",
            purchaseDate: new Date(),
          },
          {
            id: "2",
            name: "Kombajn New Holland",
            type: "Kombajn",
            condition: "GOOD",
            purchaseDate: new Date(),
          },
          // więcej przykładowych maszyn...
        ];

        const sampleAnimals: Animal[] = [
          {
            id: "1",
            name: "Krasula",
            specie: "KROWA",
            birthDate: new Date(2020, 1, 1),
            number: 1,
          },
          {
            id: "2",
            name: "Baran",
            specie: "OWCA",
            birthDate: new Date(2021, 3, 15),
            number: 2,
          },
          {
            id: "3",
            name: "Kogut",
            specie: "KURA",
            birthDate: new Date(2022, 2, 10),
            number: 3,
          },
          {
            id: "4",
            name: "Klacz",
            specie: "KON",
            birthDate: new Date(2019, 0, 5),
            number: 4,
          },
          {
            id: "5",
            name: "Owca 1",
            specie: "OWCA",
            birthDate: new Date(2021, 4, 20),
            number: 5,
          },
          // więcej przykładowych zwierząt...
        ];

        const sampleFields: Field[] = [
          {
            id: "1",
            name: "Pole północne",
            size: 5.2,
            location: "Północna część gospodarstwa",
            updatedAt: new Date(2023, 2, 15),
            crops: [{ id: "1", type: "PSZENICA", isGrowing: true }],
          },
          {
            id: "2",
            name: "Pole wschodnie",
            size: 3.8,
            location: "Wschodnia część gospodarstwa",
            updatedAt: new Date(2023, 3, 2),
            crops: [{ id: "2", type: "ZIEMNIAK", isGrowing: true }],
          },
          {
            id: "3",
            name: "Pole zachodnie",
            size: 4.5,
            location: "Zachodnia część gospodarstwa",
            updatedAt: new Date(2023, 2, 28),
            crops: [{ id: "3", type: "KUKURYDZA", isGrowing: true }],
          },
          // więcej przykładowych pól...
        ];

        const sampleCrops: Crop[] = [
          {
            id: "1",
            type: "PSZENICA",
            plantedAt: new Date(2023, 3, 1),
            isGrowing: true,
          },
          {
            id: "2",
            type: "ZIEMNIAK",
            plantedAt: new Date(2023, 3, 15),
            isGrowing: true,
          },
          {
            id: "3",
            type: "KUKURYDZA",
            plantedAt: new Date(2023, 4, 1),
            isGrowing: true,
          },
          {
            id: "4",
            type: "OWIES",
            plantedAt: new Date(2023, 2, 15),
            harvestedAt: new Date(2023, 7, 15),
            yield: 2500,
            isGrowing: false,
          },
          // więcej przykładowych upraw...
        ];

        setMachines(sampleMachines);
        setAnimals(sampleAnimals);
        setFields(sampleFields);
        setCrops(sampleCrops);

        setLoading(false);
      } catch (err) {
        setError("Wystąpił błąd podczas pobierania danych");
        setLoading(false);
        console.error("Error fetching data:", err);
      }
    };

    fetchData();
  }, []);

  return { machines, animals, fields, crops, loading, error };
};

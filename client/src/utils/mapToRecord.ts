export function mapToRecord<T extends { id: string | number }>(
  array: T[]
): Record<string, T> {
  const record: Record<string, T> = array.reduce((acc, curr) => {
    // Tworzymy kopię obiektu, aby nie modyfikować oryginału
    const convertedItem = { ...curr };

    // Rekurencyjnie przeszukujemy obiekt w poszukiwaniu dat
    const convertDates = (obj: any): any => {
      if (!obj || typeof obj !== "object") return obj;

      Object.keys(obj).forEach((key) => {
        const value = obj[key];

        // Sprawdzamy czy wartość jest obiektem Date
        if (value instanceof Date) {
          // Konwertujemy Date na string ISO
          obj[key] = value.toISOString();
        }
        // Jeśli wartość jest obiektem lub tablicą, rekurencyjnie przeszukujemy ją
        else if (typeof value === "object" && value !== null) {
          convertDates(value);
        }
      });

      return obj;
    };

    // Konwertujemy daty w kopii obiektu
    convertDates(convertedItem);

    // Dodajemy przetworzony obiekt do akumulatora
    acc[curr.id] = convertedItem as T;

    return acc;
  }, {} as Record<string, T>);

  return record;
}

export default mapToRecord;

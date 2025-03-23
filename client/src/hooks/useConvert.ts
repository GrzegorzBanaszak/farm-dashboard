function useConvert() {
  function stringToEnum<T extends Record<string, string>>(
    enumObj: T,
    value: string
  ): T[keyof T] | undefined {
    // Sprawdzamy, czy wartość istnieje w enumie
    const isValueInEnum = Object.values(enumObj).includes(value as T[keyof T]);

    if (isValueInEnum) {
      return value as T[keyof T];
    }

    return undefined; // Zwracamy undefined, jeśli wartość nie istnieje w enumie
  }

  function isoStringToDateInputValue(isoString: string): string {
    const date = new Date(isoString);

    // Format YYYY-MM-DD wymagany przez input type="date"
    return date.toISOString().split("T")[0];
  }

  const ifIsoDate = (value: any) => {
    const isoDateRegex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/;

    if (isoDateRegex.test(value)) {
      return new Date(value).toLocaleDateString("pl-PL");
    }

    return value;
  };
  return { stringToEnum, isoStringToDateInputValue, ifIsoDate };
}

export default useConvert;

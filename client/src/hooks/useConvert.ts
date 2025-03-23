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
  return { stringToEnum, isoStringToDateInputValue };
}

export default useConvert;

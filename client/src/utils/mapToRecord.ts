export function mapToRecord<T extends { id: string | number }>(
  array: T[]
): Record<string, T> {
  const record: Record<string, T> = array.reduce((acc, curr) => {
    acc[curr.id] = curr;
    return acc;
  }, {} as Record<string, T>);
  return record;
}

export default mapToRecord;

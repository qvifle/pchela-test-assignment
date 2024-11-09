function arrayMove<T>(array: T[], fromIndex: number, toIndex: number): T[] {
  const result = [...array];

  const [movedElement] = result.splice(fromIndex, 1);

  result.splice(toIndex, 0, movedElement);

  return result;
}

export default arrayMove;

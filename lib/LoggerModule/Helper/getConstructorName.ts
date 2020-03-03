export function getConstructorName(instance: object): string {
  return Object.getPrototypeOf(instance)?.constructor.name;
}

export interface ConstructorType<T> extends Function {
  new (...args: any[]): T;
}

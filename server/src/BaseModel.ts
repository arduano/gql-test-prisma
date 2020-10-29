function makeModel<R extends object>() {
  type This = typeof BaseModel;

  class BaseModel {
    raw: R;

    static async wrap<T extends This>(this: T, item: R | null | Promise<R | null>) {
      const resolved = await item;
      if (!resolved) return null;
      return new this(await resolved) as InstanceType<T>;
    }

    static async wrapArray<T extends This>(this: T, items: R[] | Promise<R[]>) {
      const resolved = await items;
      return resolved.map(i => new this(i) as InstanceType<T>);
    }

    constructor(raw: R) {
      this.raw = raw;

      return new Proxy(this, {
        get(target, key, receiver) {
          if (Reflect.has(target, key)) {
            return Reflect.get(target, key, receiver);
          }
          if (Reflect.has(target.raw, key)) {
            return Reflect.get(target.raw, key);
          }
        },
        set(target, key, value, receiver) {
          if (Reflect.has(target, key)) {
            Reflect.set(target, key, value, receiver);
            return true;
          }
          return false;
        },
      });
    }
  }

  return BaseModel;
}

export type RawReadonly<T extends object> = { readonly [K in keyof T]: T[K] };

export default makeModel;

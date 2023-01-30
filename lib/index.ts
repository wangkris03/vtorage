export interface IVtorage<T> {
    defaultValues: T;
    set: (obj: Partial<T>) => void;
    assign: (obj: Partial<T>) => void;
    clear: () => void;
    val: T;
    version: string;
  }
  
  export const Vtorage = <T>(
    key: string,
    init: T,
    storage: "localStorage" | "sessionStorage" | "memory" = "localStorage",
    version = "_0.0.1"
  ): IVtorage<T> => {
    if (typeof init !== "object") {
      throw "db: init need a object";
    }
    const versionKey = `${key}${version}`
    const db = {
      version,
      val: JSON.parse(JSON.stringify(init)),
      defaultValues: JSON.parse(JSON.stringify(init)),
      set: (obj: T) => {
        db.val = obj;
        if (storage !== "memory") {
          window[storage].setItem(versionKey, JSON.stringify(db.val));
        }
      },
      assign: (obj: T) => {
        Object.assign(db.val, obj);
        if (storage !== "memory") {
          window[storage].setItem(versionKey, JSON.stringify(db.val));
        }
      },
      clear: () => {
        db.set({ ...db.defaultValues });
      },
    };
  
    if (storage !== "memory") {
      const old = window[storage].getItem(versionKey);
      if (old) {
        try {
          const obj = JSON.parse(old);
          db.assign(obj);
        } catch (err) {
          console.error(err);
        }
      }
    }
  
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return db as any;
  };
  
export interface IVtorage<T> {
    defaultValues: T;
    set: (obj: Partial<T>) => void;
    assign: (obj: Partial<T>) => void;
    clear: () => void;
    val: T;
  }
  
  export const Vtorage = <T>(
    key: string,
    init: T,
    storage: "localStorage" | "sessionStorage" | "memory" = "localStorage"
  ): IVtorage<T> => {
    if (typeof init !== "object") {
      throw "db: init need a object";
    }
  
    const db = {
      val: JSON.parse(JSON.stringify(init)),
      defaultValues: JSON.parse(JSON.stringify(init)),
      set: (obj: T) => {
        db.val = obj;
        if (storage !== "memory") {
          window[storage].setItem(key, JSON.stringify(db.val));
        }
      },
      assign: (obj: T) => {
        Object.assign(db.val, obj);
        if (storage !== "memory") {
          window[storage].setItem(key, JSON.stringify(db.val));
        }
      },
      clear: () => {
        db.set({ ...db.defaultValues });
      },
    };
  
    if (storage !== "memory") {
      const old = window[storage].getItem(key);
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
  
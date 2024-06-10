export const removeFalsyFields = <T>(obj: T): Partial<T> =>
  Object.keys(obj).reduce((acc, key) => {
    if (obj[key]) {
      acc[key] = obj[key];
    }
    return acc;
  }, {} as Partial<T>);

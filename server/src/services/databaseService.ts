export type DataBaseLookup<T> = {
  response: T | DatabaseError;
};
export type DatabaseError =
  | not_implemented_db_error
  | unknown_db_error
  | not_found_db_error;

export type not_implemented_db_error = { code: -1; msg: "Not implemented" };
export type unknown_db_error = { code: 0; msg: "Unknown" };
export type not_found_db_error = { code: 1; msg: "Not found" };

export const GetPriceFromDb = (ean_code: string): DataBaseLookup<number> => {
  return { response: { code: -1, msg: "Not implemented" } };
};

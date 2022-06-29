export type PriceLookupResponse = PriceLookupSuccess | PriceLookupFailure;

type PriceLookupSuccess = {
  response: number;
  success: true;
};
type PriceLookupFailure = {
  response: PriceLookupError;
  success: false;
};

//#region Errors
export const not_implemented_price_error = {
  code: -1,
  msg: "Not implemented",
} as const;
export const leroy_server_error = {
  code: 0,
  msg: "Leroy server failed",
} as const;
export const code_not_found_error = {
  code: 1,
  msg: "Product not found",
} as const;

export type PriceLookupError =
  | typeof not_implemented_price_error
  | typeof leroy_server_error
  | typeof code_not_found_error;
//#endregion

export const GetPrice = (ean_code: string): PriceLookupResponse => {
  return { response: not_implemented_price_error, success: false };
};

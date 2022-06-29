import createValidator, { registerType } from "typecheck.macro";
import { Header, Rect } from "./pdfHelpers";

export type InputState = {
  model: Model;
  color: Color;
  length: number;
  fissaggio: Fissaggio;
  height: number;
};

export type Model = "CLOSE" | "120/20" | "120/40";
export type Fissaggio = "Fissare" | "Murare";
export type Color = "Bianco" | "7016";

export type Product = {
  label: string;
  eanCode: string;
  picture?: string;
  refLink?: string;
  price?: number;
  model: Model;
  color: Color;
};
export type ProductQuantity = Product & { quantity: number };

export type ProductType =
  | "DogheSingole"
  | "DogheX4"
  | "Pilastro1280"
  | "Pilastro1980"
  | "Tappo"
  | "Piastra"
  | "ChiusuraLaterale1280"
  | "ChiusuraLaterale1980"
  | "Distanziatore";

// export type OutputState = Record<ProductType, ProductQuantity>;
export type OutputState = {
  DogheSingole: ProductQuantity;
  DogheX4: ProductQuantity;
  Pilastro1280: ProductQuantity;
  Pilastro1980: ProductQuantity;
  Tappo: ProductQuantity;
  Piastra: ProductQuantity;
  ChiusuraLaterale1280: ProductQuantity;
  ChiusuraLaterale1980: ProductQuantity;
  Distanziatore: ProductQuantity;
};

export type ApiCall = {
  InputState: InputState;
  OutputState: OutputState;
};

registerType("ProductType");
registerType("ProductQuantity");
registerType("OutputState");
registerType("InputState");
registerType("ApiCall");
export const validate = createValidator<ApiCall>();

export const makeRow = (prod: ProductQuantity): string[] => {
  return [
    `${prod.label}`,
    `${prod.eanCode}`,
    `${prod.quantity}`,
    `${prod.price}`,
  ];
};

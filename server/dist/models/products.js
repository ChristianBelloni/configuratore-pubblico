"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.validate = exports.makeRow = void 0;

// export type OutputState = Record<ProductType, ProductQuantity>;
const validate = p0 => {
  const f0 = p7 => p7 === "CLOSE" || p7 === "120/20" || p7 === "120/40";

  const f1 = p8 => p8 === "Bianco" || p8 === "7016";

  const f2 = p9 => !!p9 && typeof p9.label === "string" && typeof p9.eanCode === "string" && (p9.picture === undefined || typeof p9.picture === "string") && (p9.refLink === undefined || typeof p9.refLink === "string") && (p9.price === undefined || typeof p9.price === "number") && f0(p9.model) && f1(p9.color) && typeof p9.quantity === "number";

  return !!p0 && !!p0.InputState && f0(p0.InputState.model) && f1(p0.InputState.color) && typeof p0.InputState.length === "number" && (p0.InputState.fissaggio === "Fissare" || p0.InputState.fissaggio === "Murare") && typeof p0.InputState.height === "number" && !!p0.OutputState && f2(p0.OutputState.DogheSingole) && f2(p0.OutputState.DogheX4) && f2(p0.OutputState.Pilastro1280) && f2(p0.OutputState.Pilastro1980) && f2(p0.OutputState.Tappo) && f2(p0.OutputState.Piastra) && f2(p0.OutputState.ChiusuraLaterale1280) && f2(p0.OutputState.ChiusuraLaterale1980) && f2(p0.OutputState.Distanziatore);
};

exports.validate = validate;

const makeRow = prod => {
  return [`${prod.label}`, `${prod.eanCode}`, `${prod.quantity}`, `${prod.price}`];
};

exports.makeRow = makeRow;
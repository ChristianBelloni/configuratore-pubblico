import {
  GetProduct,
  InputState,
  OutputState,
  RawOutputState,
} from "./Constants";
import { logger } from "./Logger";
import { AlgoPilastri, AlgoDoghe } from "./OptimizerController";

const GetRawOutput = ({
  length,
  height,
  model,
  fissaggio,
}: InputState): RawOutputState => {
  logger.info(
    `Getting output for input:\nlength: ${length} height: ${height} model: ${model} fissaggio: ${fissaggio}`
  );
  var pilOut =
    fissaggio === "Fissare"
      ? AlgoPilastri(length!, height)
      : AlgoPilastri(length!, height + 80);
  var intModel = -1;
  switch (model) {
    case "CLOSE":
      intModel = 0;
      break;
    case "120/20":
      intModel = 1;
      break;
    case "120/40":
      intModel = 2;
      break;
  }
  var dogOut = AlgoDoghe(length!, height, intModel);

  var DogheSingole = dogOut % 4;
  var DogheX4 = Math.floor(dogOut / 4);

  var OutPut: RawOutputState = {
    DogheSingole,
    DogheX4,
    Pilastro1280: pilOut.Variant1280,
    Pilastro1980: pilOut.Variant1920,
    ChiusuraLaterale1280: height >= 1280 ? 0 : 2,
    ChiusuraLaterale1980: height < 1280 ? 0 : 2,
    Tappo: pilOut.Tot,
    Piastra: fissaggio === "Fissare" ? pilOut.Tot : 0,
    Distanziatore: model !== "CLOSE" ? dogOut * 2 : 0,
  };

  return OutPut;
};

const GetOutput = (
  {
    ChiusuraLaterale1280,
    ChiusuraLaterale1980,
    DogheSingole,
    DogheX4,
    Piastra,
    Pilastro1280,
    Pilastro1980,
    Tappo,
    Distanziatore,
  }: RawOutputState,
  { color, model }: InputState
): OutputState => {
  const out: OutputState = {
    ChiusuraLaterale1280: {
      ...GetProduct("ChiusuraLaterale1280", model, color),
      quantity: ChiusuraLaterale1280,
    },
    ChiusuraLaterale1980: {
      ...GetProduct("ChiusuraLaterale1980", model, color),
      quantity: ChiusuraLaterale1980,
    },
    DogheSingole: {
      ...GetProduct("DogheSingole", model, color),
      quantity: DogheSingole,
    },
    DogheX4: {
      ...GetProduct("DogheX4", model, color),
      quantity: DogheX4,
    },
    Pilastro1280: {
      ...GetProduct("Pilastro1280", model, color),
      quantity: Pilastro1280,
    },
    Pilastro1980: {
      ...GetProduct("Pilastro1980", model, color),
      quantity: Pilastro1980,
    },
    Piastra: {
      ...GetProduct("Piastra", model, color),
      quantity: Piastra,
    },
    Tappo: {
      ...GetProduct("Tappo", model, color),
      quantity: Tappo,
    },
    Distanziatore: {
      ...GetProduct("Distanziatore", model, color),
      quantity: Distanziatore,
    },
  };
  return out;
};

// const makeProduct = (quantity: number, model: Model, color: Color) => {};

export { GetRawOutput, GetOutput };

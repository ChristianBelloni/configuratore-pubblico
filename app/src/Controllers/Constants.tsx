export { HEIGHTS, LENGTH_INTERASSE, SCARTO_TAGLIO };

export type HeightChoice = {
  NDoghe: number;
  Height: number;
};

export type PilastroOutput = {
  Variant1280: number;
  Variant1920: number;
  Tot: number;
  Scarto?: number;
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

export type OutputState = Record<ProductType, ProductQuantity>;

export type ApplicationState = {
  input: InputState;
  rawOutput: RawOutputState;
  output: OutputState;
};

export type InputState = {
  model: Model;
  color: Color;
  length?: number;
  fissaggio: Fissaggio;
  height: number;
};

export type RawOutputState = Record<ProductType, number>;

const SCARTO_TAGLIO = 10;
const LENGTH_INTERASSE = 1500;

const HEIGHT_CHOICES_CLOSE: Array<HeightChoice> = [
  { NDoghe: 3, Height: 367 },
  { NDoghe: 4, Height: 488 },
  { NDoghe: 5, Height: 609 },
  { NDoghe: 6, Height: 730 },
  { NDoghe: 7, Height: 851 },
  { NDoghe: 8, Height: 972 },
  { NDoghe: 9, Height: 1093 },
  { NDoghe: 10, Height: 1214 },
  { NDoghe: 11, Height: 1335 },
  { NDoghe: 12, Height: 1456 },
  { NDoghe: 13, Height: 1577 },
  { NDoghe: 14, Height: 1698 },
  { NDoghe: 15, Height: 1819 },
  { NDoghe: 16, Height: 1940 },
];

const HEIGHT_CHOICES_120_20: Array<HeightChoice> = [
  { NDoghe: 3, Height: 400 },
  { NDoghe: 4, Height: 540 },
  { NDoghe: 5, Height: 680 },
  { NDoghe: 6, Height: 820 },
  { NDoghe: 7, Height: 960 },
  { NDoghe: 8, Height: 1100 },
  { NDoghe: 9, Height: 1240 },
  { NDoghe: 10, Height: 1380 },
  { NDoghe: 11, Height: 1520 },
  { NDoghe: 12, Height: 1660 },
  { NDoghe: 13, Height: 1800 },
  { NDoghe: 14, Height: 1940 },
];

const HEIGHT_CHOICES_120_40: Array<HeightChoice> = [
  { NDoghe: 3, Height: 440 },
  { NDoghe: 4, Height: 600 },
  { NDoghe: 5, Height: 760 },
  { NDoghe: 6, Height: 920 },
  { NDoghe: 7, Height: 1080 },
  { NDoghe: 8, Height: 1240 },
  { NDoghe: 9, Height: 1400 },
  { NDoghe: 10, Height: 1560 },
  { NDoghe: 11, Height: 1720 },
  { NDoghe: 12, Height: 1880 },
];
const HEIGHTS = [
  HEIGHT_CHOICES_CLOSE,
  HEIGHT_CHOICES_120_20,
  HEIGHT_CHOICES_120_40,
];

export const DogheSingole: ProductVariant = {
  CLOSE: {
    Bianco: {
      color: "Bianco",
      label: "Doga",
      model: "CLOSE",
      eanCode: "8050713250102",
    },
    "7016": {
      color: "7016",
      label: "Doga",
      model: "CLOSE",
      eanCode: "8050713250089",
    },
  },
  "120/20": {
    Bianco: {
      color: "Bianco",
      label: "Doga",
      model: "120/20",
      eanCode: "8050713250065",
    },
    "7016": {
      color: "7016",
      label: "Doga",
      model: "120/20",
      eanCode: "8050713250041",
    },
  },
  "120/40": {
    Bianco: {
      color: "Bianco",
      label: "Doga",
      model: "120/40",
      eanCode: "8050713250065",
    },
    "7016": {
      color: "7016",
      label: "Doga",
      model: "120/40",
      eanCode: "8050713250041",
    },
  },
  Type: "DogheSingole",
};

export const DogheX4: ProductVariant = {
  CLOSE: {
    Bianco: {
      color: "Bianco",
      label: "Doga x 4",
      model: "CLOSE",
      eanCode: "8050713250119",
    },
    "7016": {
      color: "7016",
      label: "Doga x 4",
      model: "CLOSE",
      eanCode: "8050713250096",
    },
  },
  "120/20": {
    Bianco: {
      color: "Bianco",
      label: "Doga x 4",
      model: "120/20",
      eanCode: "8050713250072",
    },
    "7016": {
      color: "7016",
      label: "Doga x 4",
      model: "120/20",
      eanCode: "8050713250058",
    },
  },
  "120/40": {
    Bianco: {
      color: "Bianco",
      label: "Doga x 4",
      model: "120/40",
      eanCode: "8050713250072",
    },
    "7016": {
      color: "7016",
      label: "Doga x 4",
      model: "120/40",
      eanCode: "8050713250058",
    },
  },
  Type: "DogheX4",
};

export const ChiusuraLaterale1980: ProductVariant = {
  CLOSE: {
    Bianco: {
      color: "Bianco",
      label: "Chiusura laterale 1980",
      model: "CLOSE",
      eanCode: "8050713250195",
    },
    "7016": {
      color: "7016",
      label: "Chiusura laterale 1980",
      model: "CLOSE",
      eanCode: "8050713250171",
    },
  },
  "120/20": {
    Bianco: {
      color: "Bianco",
      label: "Chiusura laterale 1980",
      model: "120/20",
      eanCode: "8050713250195",
    },
    "7016": {
      color: "7016",
      label: "Chiusura laterale 1980",
      model: "120/20",
      eanCode: "8050713250171",
    },
  },
  "120/40": {
    Bianco: {
      color: "Bianco",
      label: "Chiusura laterale 1980",
      model: "120/40",
      eanCode: "8050713250195",
    },
    "7016": {
      color: "7016",
      label: "Chiusura laterale 1980",
      model: "120/40",
      eanCode: "8050713250171",
    },
  },
  Type: "ChiusuraLaterale1980",
};

export const ChiusuraLaterale1280: ProductVariant = {
  CLOSE: {
    Bianco: {
      color: "Bianco",
      label: "Chiusura laterale 1280",
      model: "CLOSE",
      eanCode: "8050713250188",
    },
    "7016": {
      color: "7016",
      label: "Chiusura laterale 1280",
      model: "CLOSE",
      eanCode: "8050713250164",
    },
  },
  "120/20": {
    Bianco: {
      color: "Bianco",
      label: "Chiusura laterale 1280",
      model: "120/20",
      eanCode: "8050713250188",
    },
    "7016": {
      color: "7016",
      label: "Chiusura laterale 1280",
      model: "120/20",
      eanCode: "8050713250164",
    },
  },
  "120/40": {
    Bianco: {
      color: "Bianco",
      label: "Chiusura laterale 1280",
      model: "120/40",
      eanCode: "8050713250188",
    },
    "7016": {
      color: "7016",
      label: "Chiusura laterale 1280",
      model: "120/40",
      eanCode: "8050713250164",
    },
  },
  Type: "ChiusuraLaterale1280",
};

export const Pilastro1280: ProductVariant = {
  CLOSE: {
    Bianco: {
      color: "Bianco",
      label: "Pilastro 1280",
      model: "CLOSE",
      eanCode: "8050713250027",
    },
    7016: {
      color: "7016",
      label: "Pilastro 1280",
      model: "CLOSE",
      eanCode: "8050713250003",
    },
  },
  "120/20": {
    Bianco: {
      color: "Bianco",
      label: "Pilastro 1280",
      model: "120/20",
      eanCode: "8050713250027",
    },
    7016: {
      color: "7016",
      label: "Pilastro 1280",
      model: "120/20",
      eanCode: "8050713250003",
    },
  },
  "120/40": {
    Bianco: {
      color: "Bianco",
      label: "Pilastro 1280",
      model: "120/40",
      eanCode: "8050713250027",
    },
    7016: {
      color: "7016",
      label: "Pilastro 1280",
      model: "120/40",
      eanCode: "8050713250003",
    },
  },
  Type: "Pilastro1280",
};

export const Pilastro1980: ProductVariant = {
  CLOSE: {
    Bianco: {
      color: "Bianco",
      label: "Pilastro 1980",
      model: "CLOSE",
      eanCode: "8050713250034",
    },
    7016: {
      color: "7016",
      label: "Pilastro 1980",
      model: "CLOSE",
      eanCode: "8050713250010",
    },
  },
  "120/20": {
    Bianco: {
      color: "Bianco",
      label: "Pilastro 1980",
      model: "120/20",
      eanCode: "8050713250034",
    },
    7016: {
      color: "7016",
      label: "Pilastro 1980",
      model: "120/20",
      eanCode: "8050713250010",
    },
  },
  "120/40": {
    Bianco: {
      color: "Bianco",
      label: "Pilastro 1980",
      model: "120/40",
      eanCode: "8050713250034",
    },
    7016: {
      color: "7016",
      label: "Pilastro 1980",
      model: "120/40",
      eanCode: "8050713250010",
    },
  },
  Type: "Pilastro1280",
};

export const Piastra: ProductVariant = {
  CLOSE: {
    Bianco: {
      color: "Bianco",
      label: "Piastra",
      model: "CLOSE",
      eanCode: "8050713250218",
    },
    7016: {
      color: "7016",
      label: "Piastra",
      model: "CLOSE",
      eanCode: "8050713250201",
    },
  },
  "120/20": {
    Bianco: {
      color: "Bianco",
      label: "Piastra",
      model: "120/20",
      eanCode: "8050713250218",
    },
    7016: {
      color: "7016",
      label: "Piastra",
      model: "120/20",
      eanCode: "8050713250201",
    },
  },
  "120/40": {
    Bianco: {
      color: "Bianco",
      label: "Piastra",
      model: "120/40",
      eanCode: "8050713250218",
    },
    7016: {
      color: "7016",
      label: "Piastra",
      model: "120/40",
      eanCode: "8050713250201",
    },
  },
  Type: "Piastra",
};

export const Tappo: ProductVariant = {
  CLOSE: {
    Bianco: {
      color: "Bianco",
      label: "Tappo",
      model: "CLOSE",
      eanCode: "8050713250232",
    },
    7016: {
      color: "7016",
      label: "Tappo",
      model: "CLOSE",
      eanCode: "8050713250225",
    },
  },
  "120/20": {
    Bianco: {
      color: "Bianco",
      label: "Tappo",
      model: "120/20",
      eanCode: "8050713250232",
    },
    7016: {
      color: "7016",
      label: "Tappo",
      model: "120/20",
      eanCode: "8050713250225",
    },
  },
  "120/40": {
    Bianco: {
      color: "Bianco",
      label: "Tappo",
      model: "120/40",
      eanCode: "8050713250232",
    },
    7016: {
      color: "7016",
      label: "Tappo",
      model: "120/40",
      eanCode: "8050713250225",
    },
  },
  Type: "Tappo",
};

export const Distanziatore: ProductVariant = {
  CLOSE: {
    Bianco: {
      color: "Bianco",
      label: "Distanziatore",
      model: "CLOSE",
      eanCode: "",
    },
    7016: {
      color: "7016",
      label: "Distanziatore",
      model: "CLOSE",
      eanCode: "",
    },
  },
  "120/20": {
    Bianco: {
      color: "Bianco",
      label: "Distanziatore",
      model: "120/20",
      eanCode: "8050713250157",
    },
    7016: {
      color: "7016",
      label: "Distanziatore",
      model: "120/20",
      eanCode: "8050713250133",
    },
  },
  "120/40": {
    Bianco: {
      color: "Bianco",
      label: "Distanziatore",
      model: "120/40",
      eanCode: "8050713250140",
    },
    7016: {
      color: "7016",
      label: "Distanziatore",
      model: "120/40",
      eanCode: "8050713250126",
    },
  },
  Type: "Distanziatore",
};

export type ApiCall = {
  InputState: InputState;
  OutputState: OutputState;
};

type ProductColorVariant = Record<Color, Product>;
export type ProductVariant = Record<Model, ProductColorVariant> & {
  Type: ProductType;
};

export const Inventory: InventoryType = {
  DogheSingole,
  DogheX4,
  ChiusuraLaterale1280,
  ChiusuraLaterale1980,
  Piastra,
  Pilastro1280,
  Pilastro1980,
  Tappo,
  Distanziatore,
}; // remove nullable type declaration
export type InventoryType = Record<ProductType, ProductVariant>;

export const GetHeights = (model: Model): Array<HeightChoice> => {
  switch (model) {
    case "CLOSE":
      return HEIGHT_CHOICES_CLOSE;
    case "120/20":
      return HEIGHT_CHOICES_120_20;
    case "120/40":
      return HEIGHT_CHOICES_120_40;
  }
};

export const GetProduct = (
  product: ProductType,
  model: Model,
  color: Color
): Product => {
  const products = Object.entries(Inventory!);
  const raw_p = products.find((element) => element[0] === product)!;
  var p = getColorVariant(getModelVariant(raw_p[1], model), color);
  return { ...p, refLink: SEARCH_URL + p.eanCode };
};

const getModelVariant = (
  product: ProductVariant,
  model: Model
): ProductColorVariant => {
  switch (model) {
    case "CLOSE":
      return product.CLOSE;
    case "120/20":
      return product["120/20"];
    case "120/40":
      return product["120/40"];
  }
};

const getColorVariant = (
  product: ProductColorVariant,
  color: Color
): Product => {
  switch (color) {
    case "Bianco":
      return product.Bianco;
    case "7016":
      return product[7016];
  }
};

export const SEARCH_URL =
  "https://www.leroymerlin.it/v3/search/search.do?keyword=";

export const DefaultState: ApplicationState = {
  input: {
    color: "Bianco",
    fissaggio: "Fissare",
    height: GetHeights("CLOSE")[0].Height,
    length: 0,
    model: "CLOSE",
  },
  output: {
    ChiusuraLaterale1280: {
      label: "Chiusura laterale",
      color: "7016",
      eanCode: "",
      model: "CLOSE",
      quantity: 0,
    },
    ChiusuraLaterale1980: {
      label: "Chiusura laterale",
      color: "7016",
      eanCode: "",
      model: "CLOSE",
      quantity: 0,
    },
    DogheSingole: {
      label: "Doga",
      color: "7016",
      eanCode: "",
      model: "CLOSE",
      quantity: 0,
    },
    DogheX4: {
      label: "Doga x 4",
      color: "7016",
      eanCode: "",
      model: "CLOSE",
      quantity: 0,
    },
    Piastra: {
      label: "Piastra di fissaggio",
      color: "7016",
      eanCode: "",
      model: "CLOSE",
      quantity: 0,
    },
    Pilastro1280: {
      label: "Pilastro 1280",
      color: "7016",
      eanCode: "",
      model: "CLOSE",
      quantity: 0,
    },
    Pilastro1980: {
      label: "Pilastro 1980",
      color: "7016",
      eanCode: "",
      model: "CLOSE",
      quantity: 0,
    },
    Tappo: {
      label: "Tappo pilastro",
      color: "7016",
      eanCode: "",
      model: "CLOSE",
      quantity: 0,
    },
    Distanziatore: {
      label: "Distanziatore",
      color: "7016",
      eanCode: "",
      model: "CLOSE",
      quantity: 0,
    },
  },
  rawOutput: {
    ChiusuraLaterale1280: 0,
    ChiusuraLaterale1980: 0,
    DogheSingole: 0,
    DogheX4: 0,
    Piastra: 0,
    Pilastro1280: 0,
    Pilastro1980: 0,
    Tappo: 0,
    Distanziatore: 0,
  },
};

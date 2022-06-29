import {
  HEIGHTS,
  HeightChoice,
  LENGTH_INTERASSE,
  PilastroOutput,
  SCARTO_TAGLIO,
} from "./Constants";

export const GetTotPannellature = (length: number, length_interasse: number) => {
  return Math.ceil(length / length_interasse);
};

export const GetTotPerPannellatura = (
  height: number,
  heights: Array<HeightChoice>
) => {
  const element = heights.find((e) => e.Height >= height);
  // finds first element whose height is greater or equal than provided height;
  // array must be sorted lower to greater

  if (element !== undefined) {
    return element.NDoghe;
  }

  return 0;
};

const GetTotDoghe = (n_pannellature: number, n_per_pannellatura: number) => {
  return n_pannellature * n_per_pannellatura;
};

const AlgoDoghe = (length: number, height: number, model: number) => {
  const t_pannellature = GetTotPannellature(length, LENGTH_INTERASSE);
  const t_per_pannellatura = GetTotPerPannellatura(height, HEIGHTS[model]);

  return GetTotDoghe(t_pannellature, t_per_pannellatura);
};
// End Doghe section

const GetTotPilastri = (length: number, length_interasse: number) => {
  return Math.ceil(length / length_interasse) + 1;
};

const AlgoPilastri = (length: number, height: number): PilastroOutput => {
  let scarto = 0;
  const t_pilastri = GetTotPilastri(length, LENGTH_INTERASSE);
  const heightPlusScarto = height + SCARTO_TAGLIO + 20;
  if (heightPlusScarto > 1280) {
    scarto = (1980 - heightPlusScarto) * t_pilastri;
    return {
      Variant1280: 0,
      Variant1920: t_pilastri,
      Tot: t_pilastri,
      Scarto: scarto,
    };
  }

  const scarto1280 = scartoAll(t_pilastri, heightPlusScarto, 1280);
  const scarto1980 = scartoAll(t_pilastri, heightPlusScarto, 1980);
  const scarto1980One1280 = scartoAll1980One1280(
    t_pilastri,
    heightPlusScarto,
    1980,
    1280
  );

  const scarto1280One1980 = scartoAll1980One1280(
    t_pilastri,
    heightPlusScarto,
    1280,
    1980
  );

  type scarti = {
    variant: "1280" | "1980" | "1280_1980" | "1980_1280";
    value: number;
  };

  const scarti_array: Array<scarti> = [
    { variant: "1280", value: scarto1280 },
    { variant: "1980", value: scarto1980 },
    { variant: "1280_1980", value: scarto1280One1980 },
    { variant: "1980_1280", value: scarto1980One1280 },
  ];

  const scarti_value = scarti_array.map((x) => x.value);

  const min = Math.min(...scarti_value);
  const min_scarto = scarti_array.find((x) => x.value === min)!;

  console.log("Scarti: " + scarti_value);

  const pilastri_1280_per_height = Math.max(
    Math.floor(1280 / heightPlusScarto),
    1
  );
  const pilastri_1980_per_height = Math.max(
    Math.floor(1980 / heightPlusScarto),
    1
  );

  switch (min_scarto.variant) {
    case "1280":
      return {
        Tot: t_pilastri,
        Variant1280: Math.ceil(t_pilastri / pilastri_1280_per_height),
        Variant1920: 0,
        Scarto: min_scarto.value,
      };
    case "1980":
      return {
        Tot: t_pilastri,
        Variant1280: 0,
        Variant1920: Math.ceil(t_pilastri / pilastri_1980_per_height),
        Scarto: min_scarto.value,
      };
    case "1280_1980":
      return {
        Tot: t_pilastri,
        Variant1280: Math.ceil(t_pilastri / pilastri_1280_per_height) - 1,
        Variant1920: 1,
        Scarto: min_scarto.value,
      };
    case "1980_1280":
      return {
        Tot: t_pilastri,
        Variant1280: 1,
        Variant1920: Math.ceil(t_pilastri / pilastri_1980_per_height) - 1,
        Scarto: min_scarto.value,
      };
  }
};

const scartoAll = (t_pilastri: number, height: number, pil_height: number) => {
  const pilPerHeight = Math.floor(pil_height / height);
  const scartoPerPil =
    pil_height - pilPerHeight * height + SCARTO_TAGLIO * (pilPerHeight - 1);

  const totPil = Math.ceil(t_pilastri / pilPerHeight);

  const remainder = t_pilastri % pilPerHeight;
  const remainder_scarto = pil_height - remainder * height;

  return (totPil - 1) * scartoPerPil + remainder_scarto;
};

const scartoAll1980One1280 = (
  t_pilastri: number,
  height: number,
  all: number,
  one: number
) => {
  const pilPerHeightAll = Math.floor(all / height);
  // const pilPerHeightOne = Math.floor(one / height);

  const scartoPerPilAll =
    all - pilPerHeightAll * height + SCARTO_TAGLIO * (pilPerHeightAll - 1);

  // const scartoPerPilOne =
  //   one - pilPerHeightOne * height + SCARTO_TAGLIO * (pilPerHeightOne - 1);

  const totPil = Math.ceil(t_pilastri / pilPerHeightAll) - 1;

  const remainder = t_pilastri % pilPerHeightAll;
  const remainder_scarto = one - remainder * height;

  if (remainder_scarto < 0) return Infinity;

  return totPil * scartoPerPilAll + remainder_scarto;
};

// End Pilastri section

export { AlgoDoghe, AlgoPilastri };

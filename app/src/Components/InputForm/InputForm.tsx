import { PropsWithChildren, useEffect } from "react";
import { Select, SliderSelect } from "./Select";
import LengthInput from "./LengthInput";
import { SimpleGrid } from "@mantine/core";

import {
  InputState,
  Model,
  Fissaggio,
  GetHeights,
  Color,
} from "../../Controllers/Constants";

const ModelOptions: { model: Model; label: string; value: number }[] = [
  {
    model: "CLOSE",
    label: "Close",
    value: 0,
  },
  {
    model: "120/20",
    label: "120/20",
    value: 1,
  },
  {
    model: "120/40",
    label: "120/40",
    value: 2,
  },
];

const FissaggioOptions: {
  fissaggio: Fissaggio;
  label: string;
  value: number;
}[] = [
  {
    fissaggio: "Fissare",
    label: "Fissare",
    value: 0,
  },
  {
    fissaggio: "Murare",
    label: "Murare",
    value: 1,
  },
];
const ColorOptions: {
  color: Color;
  label: string;
  value: number;
}[] = [
  {
    color: "Bianco",
    label: "Bianco",
    value: 0,
  },
  {
    color: "7016",
    label: "Grigio",
    value: 1,
  },
];
type Props = {
  state: InputState;
  updateState: (arg0: InputState) => void;
};

const InputForm = ({ state, updateState }: PropsWithChildren<Props>) => {
  useEffect(() => {
    updateState({ ...state, height: GetHeights(state.model)[0].Height });
  }, [state.model]);

  return (
    <SimpleGrid
      cols={3}
      breakpoints={[
        { maxWidth: 980, cols: 3, spacing: "md" },
        { maxWidth: 755, cols: 2, spacing: "sm" },
        { maxWidth: 600, cols: 1, spacing: "sm" },
      ]}
    >
      <Select
        title="Modello"
        value={ModelOptions.find((x) => x.model === state.model)!}
        options={ModelOptions}
        key_selector={(o) => o.value}
        label_selector={(o) => o.label}
        updateState={(e) => updateState({ ...state, model: e.model })}
        value_selector={(s) =>
          ModelOptions.find((x) => x.value.toString() === s)!
        }
      />
      <Select
        title="Fissaggio"
        value={FissaggioOptions.find((x) => x.fissaggio === state.fissaggio)!}
        options={FissaggioOptions}
        label_selector={(f) => f.label}
        key_selector={(f) => f.value}
        updateState={(f) => updateState({ ...state, fissaggio: f.fissaggio })}
        value_selector={(s) =>
          FissaggioOptions.find((x) => x.value.toString() === s)!
        }
      />
      <Select
        title="Colore"
        value={ColorOptions.find((x) => x.color === state.color)!}
        options={ColorOptions}
        label_selector={(f) => f.label}
        key_selector={(f) => f.value}
        updateState={(f) => updateState({ ...state, color: f.color })}
        value_selector={(s) =>
          ColorOptions.find((x) => x.value.toString() === s)!
        }
      />
      <LengthInput
        title="Lunghezza"
        value={state.length}
        updateState={(length) => {
          updateState({ ...state, length });
        }}
      />
      <Select
        title="Altezza"
        value={{
          Height: state.height,
          NDoghe: GetHeights(state.model).find((x) => x.Height === state.height)
            ?.NDoghe!,
        }}
        options={GetHeights(state.model)}
        label_selector={(h) => h?.Height?.toString()}
        key_selector={(h) => h.Height}
        value_selector={(s) => {
          return GetHeights(state.model).find(
            (x) => x.Height.toString() === s
          )!;
        }}
        updateState={(e) => updateState({ ...state, height: e.Height })}
      />
    </SimpleGrid>
  );
};

export { InputForm };

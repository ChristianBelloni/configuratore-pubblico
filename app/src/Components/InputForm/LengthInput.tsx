import React from "react";
import { Stack, TextInput, Text, NumberInput } from "@mantine/core";

type Props = {
  title?: string;
  value?: number;
  updateState: (arg0: number | undefined) => void;
};

const LengthInput: React.FC<Props> = ({ value, updateState, title }) => {
  return (
    <Stack>
      {title === null ? <></> : <Text>{title}</Text>}
      <NumberInput
        value={isNaN(value!) ? NaN : value}
        onChange={(e) => {
          var length = e;
          updateState(length);
        }}
      ></NumberInput>
    </Stack>
  );
};

export default LengthInput;

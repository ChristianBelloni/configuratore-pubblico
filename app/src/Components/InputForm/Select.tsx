import React, { PropsWithChildren, useEffect } from "react";
import { Select as MantineSelect, Slider, Stack, Text } from "@mantine/core";
import { abort } from "process";
import { logger } from "../../Controllers/Logger";

type Props<T> = {
  title?: string;
  options: Array<T>;
  value: T;
  key_selector: (arg0: T) => number;
  label_selector: (arg0: T) => string;
  updateState: (arg0: T) => void;
  value_selector?: (arg0: string) => T;
};

const Select = <T,>({
  title,
  options,
  key_selector,
  label_selector,
  updateState,
  value_selector,
  value,
}: PropsWithChildren<Props<T>>) => {
  const madeData = options.map((x) => {
    return {
      value: key_selector!(x).toString(),
      label: label_selector(x),
    };
  });
  return (
    <Stack>
      {title === null ? <></> : <Text>{title}</Text>}
      <MantineSelect
        onChange={(e) => {
          updateState(value_selector!(e!));
        }}
        value={key_selector(value).toString()}
        data={madeData}
      />
    </Stack>
  );
};

export { Select };

export const SliderSelect = <T,>({
  title,
  options,
  value,
  label_selector,
  updateState,
}: PropsWithChildren<Props<T>>) => {
  const length = options.length;
  let index = 0;

  useEffect(() => {
    updateState(options[index]);
    return () => {};
  }, []);

  if (
    options.findIndex((x) => label_selector(x) === label_selector(value)) === -1
  ) {
    index = 0;
    logger.info("invalid height");
    // updateState(options[0]);
  } else {
    index = options.findIndex(
      (x) => label_selector(x) === label_selector(value)
    );
  }

  return (
    <Stack>
      {title === null ? <></> : <Text>{title}</Text>}
      <Stack spacing="xs">
        <Text>{label_selector(value)}</Text>
        <Slider
          min={0}
          max={length - 1}
          step={1}
          value={index}
          label={null}
          onChange={(e) => {
            updateState(options[e]);
          }}
        />
      </Stack>
    </Stack>
  );
};

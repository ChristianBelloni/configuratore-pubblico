import React, { useEffect, useState } from "react";
import { InputForm } from "./Components/InputForm";
import { OutputForm } from "./Components/OutputForm";
import {
  ApplicationState,
  DefaultState,
  InputState,
} from "./Controllers/Constants";
import { GetOutput, GetRawOutput } from "./Controllers/StateController";
import {
  Card,
  Container,
  Divider,
  MantineProvider,
  Space,
  Title,
} from "@mantine/core";
import { logger } from "./Controllers/Logger";

function App() {
  const [appState, setAppState] = useState<ApplicationState>(DefaultState);

  const SetInputState = (input: InputState) => {
    let new_state: ApplicationState = appState;
    try {
      var RawOutput = GetRawOutput(input);
      var Output = GetOutput(RawOutput, input);
      new_state = {
        ...appState!,
        input,
        output: Output,
        rawOutput: RawOutput,
      };
      setAppState((t) => {
        new_state = { ...t!, input, output: Output, rawOutput: RawOutput };
        return new_state;
      });
    } catch (error) {
      new_state = {
        ...appState!,
        input,
      };
      setAppState((t) => {
        new_state = { ...t, input: { ...input } };
        return new_state;
      });
    }
    const to_persist = JSON.stringify(new_state!);
    localStorage.setItem("alba-cache", to_persist);
  };

  useEffect(() => {
    const cached = localStorage.getItem("alba-cache");

    if (cached != null) {
      try {
        const data: ApplicationState = JSON.parse(cached);
        setAppState(data);
      } catch {}
    } else {
      SetInputState(appState.input);
    }

    return () => {};
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <MantineProvider
      theme={{
        colorScheme: "dark",
        primaryColor: "red",
      }}
      withGlobalStyles
      withNormalizeCSS
    >
      <Container style={{ padding: "5rem" }}>
        <Card radius="lg">
          <Container size="lg">
            <Space h="lg" />
            <Title align="center">Configuratore</Title>
            <Space h="lg" />
            <Space h="lg" />
            <InputForm state={appState!.input} updateState={SetInputState} />
            <Space h="lg" />
            <Space h="lg" />
            <Space h="lg" />
          </Container>
          <Divider size="sm" />
          <Container size="lg">
            <Space h="lg" />
            <Space h="lg" />
            <Space h="lg" />
            <Space h="lg" />
            <OutputForm state={appState.output} input={appState!.input} />
          </Container>
        </Card>
      </Container>
    </MantineProvider>
  );
}
export default App;

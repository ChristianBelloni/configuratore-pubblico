import React from "react";
import {
  ApiCall,
  InputState,
  OutputState,
  ProductQuantity,
} from "../../Controllers/Constants";
import { makePdfAPI } from "../../Controllers/PDFController";

import {
  Table,
  Button,
  Container,
  Center,
  Stack,
  ActionIcon,
} from "@mantine/core";
import { ExternalLink } from "tabler-icons-react";
import { useMediaQuery } from "@mantine/hooks";

type Props = { state: OutputState; input: InputState };

const OutputForm: React.FC<Props> = ({ state, input }) => {
  const downloadPdf = (data: ApiCall) => {
    makePdfAPI(data, (c) => alert(c));
  };
  const isTabletOrMobile = useMediaQuery("(max-width: 1224px)");

  return (
    <Stack>
      <Table key={0}>
        <thead key={3}>
          <tr key={4}>
            <th>Prodotto</th>
            {!isTabletOrMobile ? <th>Codice</th> : <></>}

            <th>Quantita'</th>
            {!isTabletOrMobile ? (
              <>
                <th>Colore</th>
                <th>Modello</th>
              </>
            ) : (
              <></>
            )}
            <th>Prezzo</th>
            <th>Link</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(state).map((x) =>
            x[1].quantity !== 0 ? (
              <ProductRow key={x[1].eanCode} product={x[1]} />
            ) : (
              <></>
            )
          )}
          {/* <ProductRow product={state.DogheSingole}></ProductRow>
          <ProductRow product={state.DogheX4}></ProductRow>
          <ProductRow product={state.Pilastro1280}></ProductRow>
          <ProductRow product={state.Pilastro1980}></ProductRow>
          <ProductRow product={state.ChiusuraLaterale1280}></ProductRow>
          <ProductRow product={state.ChiusuraLaterale1980}></ProductRow>
          <ProductRow product={state.Tappo}></ProductRow>
          <ProductRow product={state.Piastra}></ProductRow>
          <ProductRow product={state.Distanziatore}></ProductRow> */}
        </tbody>
      </Table>
      <Button
        key={1}
        style={{ alignSelf: "center" }}
        onClick={(e: any) =>
          downloadPdf({ OutputState: state, InputState: input })
        }
      >
        Scarica lista
      </Button>
    </Stack>
  );
};

const ProductRow: React.FC<{ product: ProductQuantity }> = ({ product }) => {
  const isTabletOrMobile = useMediaQuery("(max-width: 800px)");
  const isMobile = useMediaQuery("(max-width: 600px)");
  return (
    <tr key={product.eanCode}>
      <td>{product.label}</td>
      {!isTabletOrMobile ? <td>{product.eanCode}</td> : <></>}

      <td>{product.quantity}</td>
      {!isTabletOrMobile ? (
        <>
          <td>{product.color}</td>
          <td>{product.model}</td>
        </>
      ) : (
        <></>
      )}

      <td>{product.price}</td>
      <td>
        {isMobile ? (
          <Button>
            <ExternalLink />
          </Button>
        ) : (
          <Button
            onClick={(e: any) => {
              window.open(product.refLink!, "_blank")!.focus();
            }}
          >
            Vedi su leroy merlin
          </Button>
        )}
      </td>
    </tr>
  );
};

export default OutputForm;

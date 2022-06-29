import pdfkit from "pdfkit";
import PDFDocumentWithTables from "pdfkit-table";
import { Table, Data, Rect, Header } from "../models/pdfHelpers";
import { ApiCall, makeRow, OutputState } from "../models/products";
import icon from "../imgs/icon.jpg";
import { logger } from "../logging/loggers";
import { cwd } from "process";

const FONT_SIZE = 30;

async function makePdf(
  rawData: ApiCall,
  dataCall: (arg0: any) => {},
  endCall: () => {}
) {
  const doc = new PDFDocumentWithTables({ margin: 30, size: "A4" });

  const data = Object.entries(rawData.OutputState).filter(
    (x) => x[1].quantity !== 0
  );
  const TableHeader: (string | Header)[] = [
    "Prodotto",
    "Codice",
    "Quantità",
    "Prezzo",
  ];

  const table: Table = {
    title: "Prodotti",
    headers: TableHeader,
    rows: data.map((x) => makeRow(x[1])),
  };
  doc.on("data", dataCall);
  doc.on("end", endCall);

  const SettingsTable: Table = {
    title: "Parametri cancellata",
    headers: [
      { label: "Altezza", valign: "center" },
      { label: "Lunghezza", valign: "center" },
      { label: "Modello", valign: "center" },
      { label: "Colore", valign: "center" },
      { label: "Fissaggio", valign: "center" },
    ],
    rows: [
      [
        `${rawData.InputState.length}`,
        `${rawData.InputState.height}`,
        `${rawData.InputState.model}`,
        `${rawData.InputState.color}`,
        `${rawData.InputState.fissaggio}`,
      ],
    ],
  };

  logger.info(cwd());
  doc.fontSize(15);
  doc
    .image((icon as string).replace("/dist", "./dist"), 495, 15, {
      fit: [50, 50],
      align: "right",
      valign: "center",
    })
    .text("Riepilogo", 0, 42.5, { align: "center" });

  doc.text("", 0, 0);
  doc.moveDown(5);
  await doc.table(SettingsTable, {
    prepareRow: (row, indexColumn, indexRow, rectRow, rectCell) =>
      doc.font("Helvetica").fontSize(10),
  });
  doc.moveDown(7);
  await doc.table(table, {
    prepareRow: (row, indexColumn, indexRow, rectRow, rectCell) => {
      const { x, y, width, height } = rectCell;
      let c: PDFDocumentWithTables;
      if (indexColumn === 1) {
        try {
          c = doc
            .image(`./dist/imgs/${row[1]}.png`, x + 2, y + 2, {
              width: width - 8,
              height: height - 4,
            })
            .strokeOpacity(0)
            .fillOpacity(0);
        } catch (error) {
          //
        }
      } else {
        c = doc.font("Helvetica", 10).strokeOpacity(1).fillOpacity(1);
      }
      return c;
    },
    minRowHeight: 40,
    columnsSize: [200, 170 + 5.28, 50, 50], // 595.28
    x: 60,
  });
  doc.end();
}

export { makePdf };

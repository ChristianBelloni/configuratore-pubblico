"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.makePdf = makePdf;

var _pdfkitTable = _interopRequireDefault(require("pdfkit-table"));

var _products = require("../models/products");

var _loggers = require("../logging/loggers");

var _process = require("process");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const icon = "/dist/imgs/70ef82bbee6d5b7f174a67a0629dff62.jpg";
const FONT_SIZE = 30;

async function makePdf(rawData, dataCall, endCall) {
  const doc = new _pdfkitTable.default({
    margin: 30,
    size: "A4"
  });
  const data = Object.entries(rawData.OutputState).filter(x => x[1].quantity !== 0);
  const TableHeader = ["Prodotto", "Codice", "Quantità", "Prezzo"];
  const table = {
    title: "Prodotti",
    headers: TableHeader,
    rows: data.map(x => (0, _products.makeRow)(x[1]))
  };
  doc.on("data", dataCall);
  doc.on("end", endCall);
  const SettingsTable = {
    title: "Parametri cancellata",
    headers: [{
      label: "Altezza",
      valign: "center"
    }, {
      label: "Lunghezza",
      valign: "center"
    }, {
      label: "Modello",
      valign: "center"
    }, {
      label: "Colore",
      valign: "center"
    }, {
      label: "Fissaggio",
      valign: "center"
    }],
    rows: [[`${rawData.InputState.length}`, `${rawData.InputState.height}`, `${rawData.InputState.model}`, `${rawData.InputState.color}`, `${rawData.InputState.fissaggio}`]]
  };

  _loggers.logger.info((0, _process.cwd)());

  doc.fontSize(15);
  doc.image(icon.replace("/dist", "./dist"), 495, 15, {
    fit: [50, 50],
    align: "right",
    valign: "center"
  }).text("Riepilogo", 0, 42.5, {
    align: "center"
  });
  doc.text("", 0, 0);
  doc.moveDown(5);
  await doc.table(SettingsTable, {
    prepareRow: (row, indexColumn, indexRow, rectRow, rectCell) => doc.font("Helvetica").fontSize(10)
  });
  doc.moveDown(7);
  await doc.table(table, {
    prepareRow: (row, indexColumn, indexRow, rectRow, rectCell) => {
      const {
        x,
        y,
        width,
        height
      } = rectCell;
      let c;

      if (indexColumn === 1) {
        try {
          c = doc.image(`./dist/imgs/${row[1]}.png`, x + 2, y + 2, {
            width: width - 8,
            height: height - 4
          }).strokeOpacity(0).fillOpacity(0);
        } catch (error) {//
        }
      } else {
        c = doc.font("Helvetica", 10).strokeOpacity(1).fillOpacity(1);
      }

      return c;
    },
    minRowHeight: 40,
    columnsSize: [200, 170 + 5.28, 50, 50],
    // 595.28
    x: 60
  });
  doc.end();
}
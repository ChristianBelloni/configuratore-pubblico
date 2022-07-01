"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.makePdf = makePdf;

var _pdfkitTable = _interopRequireDefault(require("pdfkit-table"));

var _products = require("../models/products");

var _loggers = require("../logging/loggers");

var _process = require("process");

var _path = _interopRequireWildcard(require("path"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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
  doc.image("/var/webapps/config-leroy/server/imgs/icon.jpg", 495, 15, {
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
  doc.moveDown(7); // @ts-ignore

  await new Promise(resolveB => setTimeout(resolveB, 500));
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
          c = doc.image((0, _path.resolve)(__dirname.split(_path.default.sep).pop().split(_path.default.sep).pop(), `${row[1]}.png`), x + 2, y + 2, {
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
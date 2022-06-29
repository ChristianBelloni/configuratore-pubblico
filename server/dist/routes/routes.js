"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = require("express");

var _loggers = require("../logging/loggers");

var _products = require("../models/products");

var _pdfService = require("../services/pdfService");

var _bwipJs = _interopRequireDefault(require("bwip-js"));

var _promises = require("fs/promises");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const router = (0, _express.Router)();
router.post("/lista", async (req, res) => {
  _loggers.logger.info("processing pdf");

  let data;
  const valid = (0, _products.validate)(req.body);

  if (!valid) {
    _loggers.logger.error("Bad json");

    res.status(400).json({
      error: "Invalid json"
    });
    return;
  }

  data = req.body;
  const stream = res.writeHead(200, {
    "Content-Type": "application/pdf",
    "Content-Disposition": "attachment;filename=list.pdf"
  });
  const entries = Object.entries(data.OutputState);

  for (const element of entries) {
    try {
      const b = await _bwipJs.default.toBuffer({
        bcid: "ean13",
        text: element[1].eanCode,
        scale: 3,
        height: 10,
        includetext: true,
        textxalign: "center",
        backgroundcolor: "FFFFFF"
      });
      await (0, _promises.writeFile)(`dist/imgs/${element[1].eanCode}.png`, b, {
        flag: "w+"
      });
    } catch (error) {//
    }
  }

  _loggers.logger.info("making pdf");

  await (0, _pdfService.makePdf)(data, chunk => stream.write(chunk), () => stream.end());
});
var _default = router;
exports.default = _default;
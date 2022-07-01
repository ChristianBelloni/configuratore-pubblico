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

var _priceService = require("../services/priceService");

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
router.get("/price:ean_code", async (req, res) => {
  const code = req.params.ean_code; // perform price

  const priceResult = (0, _priceService.GetPrice)(code);

  if (priceResult.success) {
    // success
    _loggers.logger.info(`got price info: ${priceResult.response} euros`);

    return res.status(200).json({
      price: priceResult.response
    });
  } else if (priceResult.success == false) {
    // error
    const error = priceResult.response;

    _loggers.logger.error(priceResult.response.msg);

    switch (priceResult.response.code) {
      case -1:
        return res.status(500).json({
          error
        });
      // not implemented

      case 0:
        return res.status(500).json({
          error
        });
      // leroy error

      case 1:
        return res.status(404).json({
          error
        });
      // not found

      default:
        return res.status(500).json({
          error
        });
      // unknown error
    }
  }
});
var _default = router;
exports.default = _default;
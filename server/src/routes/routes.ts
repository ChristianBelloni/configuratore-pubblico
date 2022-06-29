import { assert } from "console";
import { Router } from "express";
import { logger } from "../logging/loggers";
import { ApiCall, OutputState, validate } from "../models/products";
import { makePdf } from "../services/pdfService";
import code from "bwip-js";
import { writeFile } from "fs/promises";
import { GetPrice } from "../services/priceService";

const router = Router();

router.post("/lista", async (req, res) => {
  logger.info("processing pdf");
  let data: ApiCall;

  const valid = validate(req.body);

  if (!valid) {
    logger.error("Bad json");
    res.status(400).json({ error: "Invalid json" });
    return;
  }
  data = req.body as ApiCall;

  const stream = res.writeHead(200, {
    "Content-Type": "application/pdf",
    "Content-Disposition": "attachment;filename=list.pdf",
  });
  const entries = Object.entries(data.OutputState);
  for (const element of entries) {
    try {
      const b = await code.toBuffer({
        bcid: "ean13",
        text: element[1].eanCode,
        scale: 3,
        height: 10,
        includetext: true,
        textxalign: "center",
        backgroundcolor: "FFFFFF",
      });
      await writeFile(`dist/imgs/${element[1].eanCode}.png`, b, {
        flag: "w+",
      });
    } catch (error) {
      //
    }
  }

  logger.info("making pdf");
  await makePdf(
    data,
    (chunk) => stream.write(chunk),
    () => stream.end()
  );
});

router.get("/price:ean_code", async (req, res) => {
  var code: string = req.params.ean_code;

  //perform price
  var priceResult = GetPrice(code);
  if (priceResult.success) {
    // success
    logger.info(`got price info: ${priceResult.response} euros`);
    return res.status(200).json({ price: priceResult.response });
  } else if (priceResult.success == false) {
    // error
    const error = priceResult.response;
    logger.error(priceResult.response.msg);

    switch (priceResult.response.code) {
      case -1:
        return res.status(500).json({ error }); // not implemented
      case 0:
        return res.status(500).json({ error }); // leroy error
      case 1:
        return res.status(404).json({ error }); // not found
      default:
        return res.status(500).json({ error }); // unknown error
    }
  }
});

export default router;

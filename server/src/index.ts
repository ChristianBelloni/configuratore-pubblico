import express from "express";
import router from "./routes/routes";
import { logger } from "./logging/loggers";

const app = express();
const port = 3500;
app.use(express.json());
app.use(router);

app.listen(port, () => {
  logger.info(`Server listening on ${port}`);
});

import "dotenv/config";
import "express-async-errors";

import express from "express";
import { configure, getLogger } from "log4js";

const environment = process.env.NODE_ENV === "production" ? "prod" : "dev";

configure(`./src/config/log4j-${environment}.json`);

const logger = getLogger("server");

const main = async () => {
  const app = express();

  app.use(express.json());

  const port = process.env.API_PORT || 3000;

  app.listen(port, () => {
    logger.info(`Server running in http://localhost:${port}`);
  });
};

main();

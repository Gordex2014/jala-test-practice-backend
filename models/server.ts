import express, { Application } from "express";
import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";
import "colors";

import { config } from "../config/config";
import { productRoutes } from "../routes";
import { dbConnection } from "../database/config.db";

class Server {
  private app: Application;
  private port: string;
  private apiPaths: {
    productPath: string;
  };

  constructor() {
    this.app = express();
    this.port = config.port;
    this.apiPaths = {
      productPath: `${config.apiVersion}/products`,
    };

    this.dbConnect();
    this.middlewares();
    this.routes();
  }

  async dbConnect() {
    await dbConnection();
  }

  middlewares(): void {
    this.app.use(express.json());
    this.app.use(express.static("public"));
    this.app.use(cors());
    this.app.use(helmet());
    this.app.use(morgan("tiny"));
  }

  routes(): void {
    this.app.use(this.apiPaths.productPath, productRoutes);
  }

  listen(): void {
    this.app.listen(this.port, () => {
      console.log(`${"[Server]".blue}: Server running on port ${this.port}`);
    });
  }
}

export default Server;

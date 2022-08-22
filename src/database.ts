import path from "path";
import { Sequelize } from "sequelize";
import { Logger } from "tslog";

const Log: Logger = new Logger();

const database: Sequelize = new Sequelize({
  dialect: "sqlite",
  storage: path.resolve(__dirname, "../database.sqlite"),
  logging: (msg: string) => Log.info(msg),
});

export default database;

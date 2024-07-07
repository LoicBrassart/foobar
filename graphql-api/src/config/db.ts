import { DataSource } from "typeorm";
import * as dotenv from "dotenv";
import { User } from "../entities/User";

dotenv.config();
const { PGPORT, POSTGRES_HOST, POSTGRES_USER, POSTGRES_DB, POSTGRES_PASSWORD } =
  process.env;

export const dataSource = new DataSource({
  entities: [User],

  type: "postgres",
  host: POSTGRES_HOST,
  port: Number(PGPORT),
  username: POSTGRES_USER,
  password: POSTGRES_PASSWORD,
  database: POSTGRES_DB,

  synchronize: true,
  logging: true,
});

import "reflect-metadata";
import { DataSource } from "typeorm";
import { User } from "./entity/User";
import { Address } from "./entity/Address";
import { Phone } from "./entity/Phone";
import { District } from "./entity/District";
import { City } from "./entity/City";
import { Town } from "./entity/Town";
import { Email } from "./entity/Email";
import { Country } from "./entity/Country";

export const AppDataSource = new DataSource({
  type: "mysql",
  host: "localhost",
  port: 3306,
  username: "root",
  password: "",
  database: "address_project",
  synchronize: true,
  logging: false,
  entities: [User, Address, Phone, Town, Email, Country, District, City ],
  migrations: [],
  subscribers: [],
});

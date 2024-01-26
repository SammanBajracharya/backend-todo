import "reflect-metadata"
import path from "path";
import { DataSourceOptions } from "typeorm/data-source/DataSourceOptions";
import { DataSource } from "typeorm";

const config: DataSourceOptions = {
    type: "postgres",
    database: "db", // database name
    username: "user", // postgres username
    password: "root", // postgres password
    logging: true,
    synchronize: false,
    entities: [path.join(__dirname, "/entities/**/*{.ts,.js}")],
    migrations: [path.join(__dirname, "/migration/**/*{.ts,.js}")],
}

export default new DataSource({
    ...config
})
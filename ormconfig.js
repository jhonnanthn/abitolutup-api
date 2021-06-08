module.exports = {
    type: "mysql",
    host: process.env.DATABASE_SD_HOST,
    port: process.env.DATABASE_SD_PORT,
    username: process.env.DATABASE_SD_USER,
    password: process.env.DATABASE_SD_PASS,
    database: process.env.DATABASE_SD_DB,
    synchronize: false,
    entities: [
      'src/model/*.ts'
    ],
    migrations: [__dirname + '/migrations/**/*.ts'],
    subscribers: [__dirname + '/subscribers/**/*{.ts,.js}'],
    cli: {
      migrationsDir: "database/migrations",
      entitiesDir: "src/model",
    },
    // logging: "all",
};
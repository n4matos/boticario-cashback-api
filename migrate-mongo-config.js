const config = {
  mongodb: {
    url: "mongodb://localhost:27017",
    databaseName: "cashback-api",

    options: {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  },
  migrationsDir: "migrations",
  changelogCollectionName: "changelog",
  migrationFileExtension: ".js",
  useFileHash: false
};

module.exports = config;

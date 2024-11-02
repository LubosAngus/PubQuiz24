export default {
  client: 'better-sqlite3',
  connection: {
    filename: './database/quiz_database.sqlite',
  },
  useNullAsDefault: true,
  migrations: {
    directory: './database/migrations',
  },
}

import { Kysely, SqliteDialect } from 'kysely'
import type { DB } from './types.js'
import SQLite from 'better-sqlite3'

export const kyselyDialect = new SqliteDialect({
  database: new SQLite('./database/quiz_database.sqlite'),
})

export const db = new Kysely<DB>({
  dialect: kyselyDialect,
})

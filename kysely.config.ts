import { defineConfig, getKnexTimestampPrefix } from 'kysely-ctl'
import { kyselyDialect } from './database/database'

export default defineConfig({
  dialect: kyselyDialect,
  migrations: {
    migrationFolder: './database/migrations',
    getMigrationPrefix: getKnexTimestampPrefix,
  },
})

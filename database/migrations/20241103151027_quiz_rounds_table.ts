import type { Kysely } from 'kysely'

export async function up(db: Kysely<unknown>): Promise<void> {
  await db.schema
    .createTable('quiz_rounds')
    .addColumn('quiz_id', 'integer', (col) =>
      col.references('quizzes.id').onDelete('cascade').notNull(),
    )
    .addColumn('round_id', 'integer', (col) =>
      col.references('rounds.id').onDelete('cascade').notNull(),
    )
    .addPrimaryKeyConstraint('quiz_rounds_pkey', ['quiz_id', 'round_id'])
    .execute()

  await db.schema
    .createIndex('quiz_rounds_quiz_id_index')
    .on('quiz_rounds')
    .column('quiz_id')
    .execute()

  await db.schema
    .createIndex('quiz_rounds_round_id_index')
    .on('quiz_rounds')
    .column('round_id')
    .execute()
}

export async function down(db: Kysely<unknown>): Promise<void> {
  await db.schema.dropTable('quiz_rounds').execute()
}

import type { Kysely } from 'kysely'
import { sql } from 'kysely'

export async function up(db: Kysely<unknown>): Promise<void> {
  await db.schema
    .createTable('questions')
    .addColumn('id', 'integer', (col) => col.primaryKey().notNull().unique())
    .addColumn('round_id', 'integer', (col) =>
      col.references('rounds.id').onDelete('cascade').notNull(),
    )
    .addColumn('text', 'text', (col) => col.notNull())
    .addColumn('answer', 'text', (col) => col.notNull())
    .addColumn('video_path_question', 'text')
    .addColumn('video_path_answer', 'text')
    .addColumn('image_path_question', 'text')
    .addColumn('image_path_answer', 'text')
    .addColumn('audio_path_question', 'text')
    .addColumn('audio_path_answer', 'text')
    .addColumn('created_at', 'timestamp', (col) =>
      col.defaultTo(sql`CURRENT_TIMESTAMP`).notNull(),
    )
    .addColumn('updated_at', 'timestamp', (col) =>
      col.defaultTo(sql`CURRENT_TIMESTAMP`).notNull(),
    )
    .execute()

  await db.schema
    .createIndex('questions_round_id_index')
    .on('questions')
    .column('round_id')
    .execute()
}

export async function down(db: Kysely<unknown>): Promise<void> {
  await db.schema.dropTable('questions').execute()
}

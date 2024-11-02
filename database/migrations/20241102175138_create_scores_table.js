/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function up(knex) {
  return knex.schema.createTable('scores', (table) => {
    table
      .integer('quiz_id')
      .references('id')
      .inTable('quizzes')
      .onDelete('CASCADE')
      .index()
    table
      .integer('round_id')
      .references('id')
      .inTable('rounds')
      .onDelete('CASCADE')
      .notNullable()
      .index()
    table
      .integer('team_id')
      .references('id')
      .inTable('teams')
      .onDelete('CASCADE')
      .notNullable()
      .index()
    table.integer('score').notNullable()
    table.primary(['quiz_id', 'round_id', 'team_id'])
  })
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function down(knex) {
  return knex.schema.dropTable('scores')
}

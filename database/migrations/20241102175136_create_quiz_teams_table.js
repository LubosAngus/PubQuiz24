/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function up(knex) {
  return knex.schema.createTable('quiz_teams', (table) => {
    table
      .integer('quiz_id')
      .references('id')
      .inTable('quizzes')
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
    table.primary(['quiz_id', 'team_id'])
  })
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function down(knex) {
  return knex.schema.dropTable('quiz_teams')
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function up(knex) {
  return knex.schema.createTable("quiz_participants", (table) => {
    table
      .integer("quiz_id")
      .references("id")
      .inTable("quizzes")
      .onDelete("CASCADE")
      .notNullable()
      .index();
    table
      .integer("participant_id")
      .references("id")
      .inTable("participants")
      .onDelete("CASCADE")
      .notNullable()
      .index();
    table.primary(["quiz_id", "participant_id"]);
  });
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function down(knex) {
  return knex.schema.dropTable("quiz_participants");
}

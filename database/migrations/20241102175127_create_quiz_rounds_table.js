/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function up(knex) {
  return knex.schema.createTable("quiz_rounds", (table) => {
    table
      .integer("quiz_id")
      .references("id")
      .inTable("quizzes")
      .onDelete("CASCADE")
      .notNullable()
      .index();
    table
      .integer("round_id")
      .references("id")
      .inTable("rounds")
      .onDelete("CASCADE")
      .notNullable()
      .index();
    table.primary(["quiz_id", "round_id"]);
  });
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function down(knex) {
  return knex.schema.dropTable("quiz_rounds");
}

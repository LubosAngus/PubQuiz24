/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function up(knex) {
  return knex.schema.createTable("round_questions", (table) => {
    table
      .integer("round_id")
      .references("id")
      .inTable("rounds")
      .onDelete("CASCADE")
      .notNullable()
      .index();
    table
      .integer("question_id")
      .references("id")
      .inTable("questions")
      .onDelete("CASCADE")
      .notNullable()
      .index();
    table.primary(["round_id", "question_id"]);
  });
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function down(knex) {
  return knex.schema.dropTable("round_questions");
}

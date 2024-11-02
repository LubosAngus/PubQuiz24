/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function up(knex) {
  return knex.schema.createTable("questions", (table) => {
    table.increments("id").primary().notNullable();
    table.text("text").notNullable();
    table.text("answer").notNullable();
    table.text("video_path_question").nullable();
    table.text("video_path_answer").nullable();
    table.text("image_path_question").nullable();
    table.text("image_path_answer").nullable();
    table.text("audio_path_question").nullable();
    table.text("audio_path_answer").nullable();
    table.timestamp("created_at").defaultTo(knex.fn.now()).notNullable();
    table.timestamp("updated_at").defaultTo(knex.fn.now()).notNullable();
  });
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function down(knex) {
  return knex.schema.dropTable("questions");
}

exports.up = function (knex) {
  return knex.schema
    .createTable("zoos", (tbl) => {
      tbl.increments("zoo_id");
      tbl.string("zoo_name", 128).unique().notNullable();
      tbl.string("address", 250).unique().notNullable();
    })
    .createTable("species", (tbl) => {
      tbl.increments("species_id");
      tbl.string("species_name", 128).unique().notNullable();
    })
    .createTable("animals", (tbl) => {
      tbl.increments("animal_id");
      tbl.string("animal_name", 128).unique().notNullable();
      tbl
        .integer("species_id")
        .notNullable()
        .unsigned()
        .references("species.id")
        .onDelete("CASCADE")
        .onUpdate("CASCADE");
    })
    .createTable("zoo_animals", (tbl) => {
      tbl.increments();
      tbl
        .integer("zoo_id")
        .unsigned()
        .notNullable()
        .references("zoos.id")
        .onDelete("CASCADE")
        .onUpdate("CASCADE");
      tbl
        .integer("animal_id")
        .unsigned()
        .notNullable()
        .references("animals.id")
        .onDelete("CASCADE")
        .onUpdate("CASCADE");
    });
};

exports.down = function (knex) {
  return knex.schema
    .dropTableIfExists("zoo_animals")
    .dropTableIfExists("animals")
    .dropTableIfExists("species")
    .dropTableIfExists("zoos");
};

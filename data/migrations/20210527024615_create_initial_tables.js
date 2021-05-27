exports.up = function (knex) {
  return knex.schema
    .createTable("species", (tbl) => {
      tbl.increments("species_id");
      tbl.string("species_name").notNullable().unique();
    })
    .createTable("animals", (tbl) => {
      tbl.increments("animal_id");
      tbl.string("animal_name").notNullable().unique();
      tbl
        .integer("species_id")
        .references("species.species_id")
        .notNullable()
        .unsigned()
        .onDelete("CASCADE")
        .onUpdate("CASCADE");
    })
    .createTable("zoos", (tbl) => {
      tbl.increments("zoo_id");
      tbl.string("zoo_name").notNullable().unique();
      tbl.string("address").notNullable();
    })
    .createTable("zoo_animals", (tbl) => {
      tbl.increments("zoo_animal_id");
      tbl
        .integer("zoo_id")
        .references("zoos.zoo_id")
        .notNullable()
        .unsigned()
        .onDelete("CASCADE")
        .onUpdate("CASCADE");
      tbl
        .integer("animal_id")
        .references("animals.animal_id")
        .notNullable()
        .unsigned()
        .onDelete("CASCADE")
        .onUpdate("CASCADE");
    });
};

exports.down = function (knex) {
  return knex.schema
    .dropTableIfExists("zoo_animals")
    .dropTableIfExists("animals")
    .dropTableIfExists("zoos")
    .dropTableIfExists("species");
};

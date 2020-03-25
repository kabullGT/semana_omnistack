
exports.up = function(knex) {
    return knex.schema.createTable('incidents', function(table){
        table.increments();//Auto generated ids
        table.string('title').notNullable();
        table.string('dsc').notNullable();
        table.decimal('value').notNullable();
        
        table.string('ong_id').notNullable();

        table.foreign('ong_id').references('id').inTable('ongs');
    });
  };
  
  exports.down = function(knex) {
      return knex.schema.dropTable('incidents');  
  };
  
exports.up = function(knex, Promise) {
    return knex.schema.createTable('team_picker', t => {
      t.bigIncrements('id');
      t.string('members');
      t.string('name');
      t.string('logoURL');
      t.timestamp('createdAt').defaultTo(knex.fn.now());
    });
  };
  
  exports.down = function(knex, Promise) {
    return knex.schema.dropTable('team_picker');
  };
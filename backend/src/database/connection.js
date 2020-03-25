const knex = require('knex');
const configuration = require('../../knexfile');

//Use dev conn.
const connection = knex(configuration.development);

module.exports = connection;
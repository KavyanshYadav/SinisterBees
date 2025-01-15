// import pg from 'pg';

import { Sequelize } from 'sequelize';

// // const pgdb = new pg.Pool({
// //   user: 'postgres',
// //   host: 'db',
// //   database: 'testdb',
// //   password: 'password',
// //   port: 5432,
// // });

// // pgdb.on('acquire', () => {
// //   console.log('connected to the database ');
// // });

// export default pgdb;

const sequelize = new Sequelize('testdb', 'postgres', 'password', {
  host: 'db',
  dialect: 'postgres',
});

export default sequelize;

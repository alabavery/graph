const pg = require('pg');

module.exports = async function (sampleId) {
  const pool = new pg.Pool({
    host: 'localhost',
    database: 'lims',
    port: 5432,
  });

  const samples = await pool.query(`select * from sample where lab_sample_id = '18RES15650_1R'`);
  await pool.end();
  console.log({samples});

  return {
    orders: [],
    sampleOrders: [],
    samples: [],
    experiments: [],
    assets: [],
    inputs: [],
    outputs: [],
    edges: [],
  };
}
import sql from 'mssql';

const config = {
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  server: process.env.DB_SERVER,    // DB hostname/IP
  database: process.env.DB_NAME,
  options: {
    trustServerCertificate: true,  
  },
};

let pool;

export async function getPool() {
  if (!pool) pool = await sql.connect(config);
  return pool;
}

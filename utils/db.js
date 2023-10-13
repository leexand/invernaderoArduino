import mysql from "mysql2/promise"

export async function query({ query, values = [] }) {
  const connection = await mysql.createConnection({
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD
  });

  try {
    const [results] = await connection.execute(query, values);
    connection.end();
    return results;
  }
  catch (error) {
    console.log(error.message)
  }
}

export const pool = mysql.createPool({
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  queueLimit: 10
})

export async function queryAndTotal({ columns = "*", table, where, join = "", start, limit, name = "data" }) {
  try {
    const conn = await pool.getConnection();
    const data = await conn.query(`SELECT SQL_CALC_FOUND_ROWS ${columns} FROM ${table} ${join} ${where} LIMIT ${start},${limit}`)
    const total = await conn.query("SELECT FOUND_ROWS() as total")
    conn.release();
    data[1] = data[1].map((item) => item.name.slice(4).toUpperCase())
    return {[name]: data[0], columns: data[1], total: total[0][0].total }
  }
  catch (error) {
    console.log(error)
  }
}

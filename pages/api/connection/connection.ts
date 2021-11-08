var mysql = require("mysql");

export const getConnection = () => {
  return mysql.createConnection({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
  });
};

export const getConnection2 = () => {
  return mysql.createConnection({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_NAME2,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
  });
};
const connection1 = require("serverless-mysql")({
  config: {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
  },
});

export default async function excuteQuery({
  query,
  values,
}: {
  query: string;
  values: any;
}) {
  try {
    const results = await connection1.query(query, values);
    await connection1.end();
    return results;
  } catch (error) {
    return { error };
  }
}

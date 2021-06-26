var mysql = require("mysql");

export const getConnection2 = () => {
  return mysql.createConnection({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_NAME2,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
  });
};

export const getConnection = () => {
  return mysql.createConnection({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
  });
};

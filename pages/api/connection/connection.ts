var mysql = require("mysql");

export const getConnection = () => {
  try {
    return mysql.createConnection({
      host: process.env.DB_HOST,
      port: process.env.DB_PORT,
      database: process.env.DB_NAME,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
    });
  } catch {
    console.log("return connection 1");
    return;
  }
};

export const getConnection2 = () => {
  try {
    return mysql.createConnection({
      host: process.env.DB_HOST,
      port: process.env.DB_PORT,
      database: process.env.DB_NAME2,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
    });
  } catch {
    console.log("return connection 2");
    return;
  }
};

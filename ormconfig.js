let ormConf = {
  "type": process.env.DB_TYPE,
  "host": process.env.DB_HOST,
  "port": process.env.DB_PORT,
  "username": process.env.DB_USERNAME,
  "password": process.env.DB_PASSWORD,
  "database": process.env.DB_NAME,
  "entities": [
    __dirname + "/dist/entity/*.entity.js"
  ],
  "logging": false,
  "synchronize": false
}

const nodeEnv = process.env.NODE_ENV || "prod";

if(nodeEnv === "dev") {
  ormConf.entities[0] = __dirname + "/src/entity/*.entity.ts";
  ormConf.logging = true;
  ormConf.synchronize = true;
}

module.exports = ormConf;

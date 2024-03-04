const mongoose = require("mongoose");
const app = require("./app");
const {
  DB_USER,
  DB_PASSWORD,
  DB_HOST,
  DB_NOMBRE,
  IP_SERVER,
  API_VERSION,
} = require("./constants");

const PORT = process.env.POST || 3977;

mongoose.connect(
  `mongodb://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/${DB_NOMBRE}?authSource=admin&directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+1.10.1`,
  (error) => {
    if (error) throw error;

    app.listen(PORT, () => {
      console.log("########################");
      console.log("#### API REST LSDA  ####");
      console.log("########################");
      console.log(`http://${IP_SERVER}:${PORT}/api/${API_VERSION}/`);
    });
  }
);

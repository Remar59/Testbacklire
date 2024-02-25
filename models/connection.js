const mongoose = require("mongoose");

const connectionString =
  "mongodb+srv://Remi:Liremersion@liremersiondbtest.2dlxx7y.mongodb.net/LireMersion_db";
mongoose
  .connect(connectionString, { connectTimeoutMS: 2000 })
  .then(() => console.log("Connexion à Liremersion DB réussi !"))
  .catch((error) => console.log(error));

const mongoose = require("mongoose");

const DB = process.env.DATABASE;

mongoose
  .connect(DB)
  .then(() => {
    console.log(`connection successful`);
  })
  .catch((err) => console.log(err));

// MongoDB Username : lokesh_melkani
// MongoDB Password : 0LedS2IgXlNEsqTs
// Data Dir : C:\Program Files\MongoDB\Server\6.0\data\
// Log Dir : C:\Program Files\MongoDB\Server\6.0\log\
// mongosh instead of mongo

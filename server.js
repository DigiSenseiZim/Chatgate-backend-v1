const express = require("express");
const knexConfig = require("./knexfile");
const Knex = require("knex");
const { Model } = require("objection");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config();
const app = express();

// Initialize knex and bind it to objection's Model
const knex = Knex(knexConfig.development);
Model.knex(knex);

// Middleware
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

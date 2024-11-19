const express = require("express");
const knexConfig = require("./knexfile");
const Knex = require("knex");
const { Model } = require("objection");
const dotenv = require("dotenv");
const cors = require("cors");
const bodyParser = require('body-parser');
const morgan = require('morgan');
const helmet = require('helmet');

dotenv.config();
const app = express();

//database endpoints
const hitlSessionRoutes = require('./src/routes/hitlRoutes');
const hitlMessageRoutes = require('./src/routes/hitlMessageRoutes');

// Initialize knex and bind it to objection's Model
const knex = Knex(knexConfig.development);
Model.knex(knex);

// Middleware
const corsOptions = {
  origin: 'http://localhost:5173', 
  optionsSuccessStatus: 200         
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.use(helmet());

const PORT = process.env.PORT || 5000;

app.use('/hitl-sessions', hitlSessionRoutes);
app.use('/hitl-messages', hitlMessageRoutes)
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

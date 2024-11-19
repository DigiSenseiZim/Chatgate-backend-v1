const express = require("express");
const knexConfig = require("./knexfile");
const Knex = require("knex");
const { Model } = require("objection");
const dotenv = require("dotenv");
const cors = require("cors");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const helmet = require("helmet");
const session = require('express-session');


dotenv.config();
const app = express();

//database endpoints
const hitlSessionRoutes = require("./src/routes/hitlRoutes");
const hitlMessageRoutes = require("./src/routes/hitlMessageRoutes");
const authRoutes = require("./src/routes/authRoutes");
const passport = require('./src/config/oAuthConfig');
const userAuthRoutes = require('./src/routes/userAuthRoutes');
const roleRoutes = require('./src/routes/roleRoutes');
const botpressMessageRoutes = require("./src/routes/botpressMessagesRoutes");
const errorHandler = require("./src/middleware/errorHandler");

// Initialize knex and bind it to objection's Model
const knex = Knex(knexConfig.development);
Model.knex(knex);

// Middleware
const corsOptions = {
  origin: "http://localhost:5173",
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use(helmet());
app.use(errorHandler);
app.use(
  session({
    secret: 'YOUR_SESSION_SECRET',
    resave: false,
    saveUninitialized: false,
  })
);
app.use(passport.initialize());
app.use(passport.session());



const PORT = process.env.PORT || 5000;
app.use("/hitl-sessions", hitlSessionRoutes);
app.use("/hitl-messages", hitlMessageRoutes);
app.use("/login", authRoutes);
app.use("/send-message", botpressMessageRoutes);
app.use(userAuthRoutes);
app.use(roleRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// controllers/Au.js
const { default: axios } = require("axios");
const hitlSessionService = require("../services/hitlSessionService");
const Joi = require("joi");
const { botpressBaseUrl } = require("../botpressApi/http-common");

class AuthController {
  // GET: List all HITL sessions
  async login(req, res) {
    // Schema for validating credentials
    const validateCredentialsQuery = (query) => {
      const schema = Joi.object({
        email: Joi.string().required(),
        password: Joi.string().required(),
      });
      return schema.validate(query);
    };

    try {
      const { error } = validateCredentialsQuery(req.body);
      if (error)
        return res.status(400).json({ error: error.details[0].message });
      // Make a request to the external API
      const response = await axios.post(
        `${botpressBaseUrl}/v2/admin/auth/login/basic/default`,
        req.body
      );

      // Send the data received from the external API back to the client
      res.json(response.data);
    } catch (error) {
      if (error.response.status === 400) {
        res.status(400).send(error.response.data.message);
      }
      if (error.response.status === 500) {
        res.status(500).send("Error fetching data from external API");
      }
    }
  }
}

module.exports = new AuthController();

// controllers/Au.js
const { default: axios } = require("axios");
const hitlSessionService = require("../services/hitlSessionService");
const Joi = require("joi");
const { botpressBaseUrl } = require("../botpressApi/http-common");

class botpressMessagesController {
  // GET: List all HITL sessions
  async sendMessage(req, res) {
    // Schema for validating session_id
    const validateSessionIdQuery = (query) => {
      const schema = Joi.object({
        session_id: Joi.number().required(),
      });
      return schema.validate(query);
    };
    // Schema for validating session_id
    const validateMessageQuery = (query) => {
      const schema = Joi.object({
        message: Joi.alternatives().try(Joi.number(), Joi.string()).required(),
      });
      return schema.validate(query);
    };
    try {
      const { error: sessionIdError } = validateSessionIdQuery(req.query);
      if (sessionIdError) {
        return res
          .status(400)
          .json({ error: sessionIdError.details[0].message });
      }

      const { error: messageError } = validateMessageQuery(req.body);
      if (messageError) {
        return res.status(400).json({ error: messageError.details[0].message });
      }
      // Retrieve the bearer token from the incoming request's headers
      const authHeader = req.headers.authorization;
      const accessToken = authHeader && authHeader.split(" ")[1]; // Extract the token part

      // Make a request to the external API
      const response = await axios.post(
        `${botpressBaseUrl}/v1/bots/test/mod/hitl/sessions/${req.query.session_id}/message`,
        req.body,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      // Send the data received from the external API back to the client
      res.json(response.data);
    } catch (error) {
      if (error.response && error.response.status === 400) {
        res.status(400).send(error.response.data.message);
      } else if (error.response && error.response.status === 401) {
        res.status(401).send("Forbidden");
      } else {
        res.status(500).send("Unexpected error occurred");
      }
    }
  }
}

module.exports = new botpressMessagesController();

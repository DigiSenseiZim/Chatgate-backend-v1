// controllers/botpressMessagesController.js
const axios = require("axios");
const hitlSessionService = require("../services/hitlSessionService");
const { validateSessionIdQuery, validateMessageBody } = require("../validators/botpressValidators");
const { botpressBaseUrl } = require("../botpressApi/http-common");

class BotpressMessagesController {
  // GET: Send a message to a HITL session
  async sendMessage(req, res, next) {
    try {
      // Validate the request query
      const { error: sessionIdError } = validateSessionIdQuery(req.query);
      if (sessionIdError) {
        return res.status(400).json({ error: sessionIdError.details[0].message });
      }

      // Validate the request body
      const { error: messageError } = validateMessageBody(req.body);
      if (messageError) {
        return res.status(400).json({ error: messageError.details[0].message });
      }

      // Extract the Bearer token
      const authHeader = req.headers.authorization;
      const accessToken = authHeader && authHeader.split(" ")[1];
      if (!accessToken) {
        return res.status(401).send("Authorization token is missing");
      }

      // Send the request to Botpress API
      const { session_id } = req.query;
      const response = await axios.post(
        `${botpressBaseUrl}/v1/bots/test/mod/hitl/sessions/${session_id}/message`,
        req.body,
        { headers: { Authorization: `Bearer ${accessToken}` } }
      );

      // Respond with the data received from Botpress API
      res.json(response.data);
    } catch (error) {
      // Pass error to the error-handling middleware
      next(this.mapError(error));
    }
  }

  // Map external errors to appropriate HTTP status codes
  mapError(error) {
    if (error.response) {
      const { status, data } = error.response;
      if (status === 400) {
        return { status: 400, message: data.message || "Bad Request" };
      } else if (status === 401) {
        return { status: 401, message: "Unauthorized" };
      }
    }
    return { status: 500, message: "Unexpected error occurred" };
  }
}

module.exports = new BotpressMessagesController();

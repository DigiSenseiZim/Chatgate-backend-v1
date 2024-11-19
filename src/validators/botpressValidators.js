// validators/botpressValidators.js
const Joi = require("joi");

// Validate session_id query parameter
const validateSessionIdQuery = (query) => {
  const schema = Joi.object({
    session_id: Joi.number().required(),
  });
  return schema.validate(query);
};

// Validate message body
const validateMessageBody = (body) => {
  const schema = Joi.object({
    message:  Joi.string().required(),
  });
  return schema.validate(body);
};

module.exports = { validateSessionIdQuery, validateMessageBody };

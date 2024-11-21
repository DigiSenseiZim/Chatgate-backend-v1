
const Recaptcha = require('google-recaptcha');

const recaptcha = new Recaptcha({
  secret: 'YOUR_RECAPTCHA_SECRET_KEY',
});

async function verifyRecaptcha(req, res, next) {
  try {
    const response = req.body['g-recaptcha-response'];
    const result = await recaptcha.verify(response, req.ip);
    if (result.success) return next();
    res.status(400).send('CAPTCHA validation failed');
  } catch (error) {
    res.status(500).send(error);
  }
}

module.exports = verifyRecaptcha;

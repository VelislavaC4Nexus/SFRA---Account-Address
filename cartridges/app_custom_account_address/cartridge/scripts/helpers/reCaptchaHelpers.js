
/**
 * Validates the reCAPTCHA token and checks the score
 * @param {string} token - The reCAPTCHA token
 * @param {Object} reCaptchaConfig - The reCAPTCHA configuration
 * @returns {Object} - The reCAPTCHA response
 */
function validateReCaptcha(token, reCaptchaConfig) {
    const reCaptchaService = require('~/cartridge/scripts/services/reCaptchaService');
    const response = reCaptchaService.call({ token, secret: reCaptchaConfig.secretKey }).object;

    const siteThreshold = reCaptchaConfig.threshold;

    return {
        success: response.score >= siteThreshold
    };
}

module.exports = {
    validateReCaptcha: validateReCaptcha
};

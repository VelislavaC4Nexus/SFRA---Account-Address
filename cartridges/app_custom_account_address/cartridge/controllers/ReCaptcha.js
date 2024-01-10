'use strict';

/**
 * @namespace ReCaptcha
 */

const server = require("server");
const reCaptcha = require('~/cartridge/scripts/middleware/mwReCaptcha');
const reCaptchaHelpers = require('~/cartridge/scripts/helpers/reCaptchaHelpers');


/**
 * ReCaptcha-CheckReCaptchaScore  : This endpoint is called via ajax request when Create Account submit button is clicked 
 * @name Base/ReCaptcha-CheckReCaptchaScore
 * @function
 * @memberof ReCaptcha
 * @param {httpparameter} - token - reCAPTCHA response token
 * @param {middleware} - server.middleware.https
 * @param {middleware} - reCaptcha.getReCAPTCHAConfig
 * @param {renders} - json
 * @param {serverfunction} - post 
 */
server.post("CheckReCaptchaScore", server.middleware.https, reCaptcha.getReCAPTCHAConfig, function (req, res, next) {
    const Resource = require('dw/web/Resource');

    const token = req.form.token;

    if (!token) {
        res.json({
            success: false,
            errorMessage: Resource.msg('recaptcha.error.token', 'recaptcha', null)
        });

        return next();
    }

    const reCaptchaConfiguration = res.getViewData(token, reCaptchaConfiguration).reCaptchaConfig;

    const reCaptchaResponse = reCaptchaHelpers.validateReCaptcha(token, reCaptchaConfiguration)

    if (reCaptchaResponse.success) {
        res.json({ success: true });
    } else {
        res.json({
            success: false,
            errorMessage: Resource.msg('recaptcha.error.low.score', 'recaptcha', null)
        });
    }

    next();
});

module.exports = server.exports();

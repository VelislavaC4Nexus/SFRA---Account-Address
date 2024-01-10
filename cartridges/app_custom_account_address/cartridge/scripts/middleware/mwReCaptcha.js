/**
 * Applies reCAPTCHA data to viewData by getting it from site preferences
 * @param {Object} req - Request object
 * @param {Object} res - Response object
 * @param {Function} next - Next call in the middleware chain
 * @returns {void}
 */
function getReCAPTCHAConfig(req, res, next) {
    const URLUtils = require('dw/web/URLUtils');
    const Site = require('dw/system/Site');

    const {
        reCaptchaSiteKey,
        reCaptchaSecretKey,
        reCaptchaThreshold
    } = Site.getCurrent().getPreferences().custom;

    const reCaptchaConfiguration = {
        siteKey: reCaptchaSiteKey,
        secretKey: reCaptchaSecretKey,
        threshold: reCaptchaThreshold,
        verifyUrl: URLUtils.url("ReCaptcha-CheckReCaptchaScore"),
    };

    const viewData = res.getViewData();
    viewData.reCaptchaConfig = reCaptchaConfiguration;
    res.setViewData(viewData);

    next();
}

module.exports = {
    getReCAPTCHAConfig: getReCAPTCHAConfig,
};

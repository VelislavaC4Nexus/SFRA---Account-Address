'use strict';

/**
 * @namespace Login
 */

const server = require('server');
server.extend(module.superModule);

const reCaptcha = require('~/cartridge/scripts/middleware/mwReCaptcha');

/**
 * Login-Show : This endpoint is called to load the Login page and attach the reCAPTHCA data
 * @name Base/Login-Show
 * @function
 * @memberof Login
 * @param {category} - sensitive
 * @param {serverfunction} - append
 */
server.append('Show', reCaptcha.getReCAPTCHAConfig);

module.exports = server.exports();

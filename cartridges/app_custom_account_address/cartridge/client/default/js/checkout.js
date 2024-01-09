'use strict';


var processInclude = require('base/util');

$(document).ready(function () {
    console.log('checkout');
    processInclude(require('./checkout/checkout'));
});
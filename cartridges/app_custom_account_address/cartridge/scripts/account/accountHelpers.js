'use strict';

var base = module.superModule;


/**
 * Creates an account model for the current customer
 * @param {Object} req - local instance of request object
 * @returns {Object} a plain object of the current customer's account
 */
base.getAccountModel = function (req) {
    var AccountModel = require('*/cartridge/models/account');
    var AddressModel = require('*/cartridge/models/address');
    var orderHelpers = require('*/cartridge/scripts/order/orderHelpers');

    var preferredAddressModel;

    if (!req.currentCustomer.profile) {
        return null;
    }

    var orderModel = orderHelpers.getLastOrder(req);

    if (req.currentCustomer.addressBook.preferredAddress) {
        var adr = req.currentCustomer.addressBook
        preferredAddressModel = new AddressModel(req.currentCustomer.addressBook.preferredAddress.raw);
    } else {
        preferredAddressModel = null;
    }

    return new AccountModel(req.currentCustomer, preferredAddressModel, orderModel);
}

module.exports = base;


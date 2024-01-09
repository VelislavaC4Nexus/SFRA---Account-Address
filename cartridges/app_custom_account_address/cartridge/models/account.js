'use strict';

var AddressModel = require('*/cartridge/models/address');
var base = module.superModule

/**
 * Creates an array of plain object that contains address book addresses, if any exist
 * @param {Object} addressBook - target customer
 * @returns {Array<Object>} an array of customer addresses
 */
function getAddresses(addressBook) {
    var result = [];
    if (addressBook) {
        for (var i = 0, ii = addressBook.addresses.length; i < ii; i++) {
            result.push(new AddressModel(addressBook.addresses[i].raw).address);
        }
    }

    return result;
}

/**
 * Creates a plain object that contains the customer's preferred address
 * @param {Object} addressBook - target customer
 * @returns {Object} an object that contains information about current customer's preferred address
 */
function getPreferredAddress(addressBook) {
    var result = null;
    if (addressBook && addressBook.preferredAddress) {
        result = new AddressModel(addressBook.preferredAddress.raw).address;
    }

    return result;
}

/**
 * Account class that represents the current customer's profile dashboard
 * @param {Object} currentCustomer - Current customer
 * @param {Object} addressModel - The current customer's preferred address
 * @param {Object} orderModel - The current customer's order history
 * @constructor
 */
function account(currentCustomer, addressModel, orderModel) {
    base.call(this, currentCustomer, addressModel, orderModel);
    this.addresses = getAddresses(currentCustomer.addressBook);
    this.preferredAddress =  addressModel || getPreferredAddress(currentCustomer.addressBook);
    
}

module.exports = account;

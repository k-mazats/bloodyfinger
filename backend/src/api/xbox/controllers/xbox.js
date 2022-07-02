'use strict';

/**
 *  xbox controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::xbox.xbox');

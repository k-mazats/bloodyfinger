'use strict';

/**
 *  grace controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::grace.grace');

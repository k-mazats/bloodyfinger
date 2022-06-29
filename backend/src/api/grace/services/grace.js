'use strict';

/**
 * grace service.
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::grace.grace');



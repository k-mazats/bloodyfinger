'use strict';

/**
 * grace router.
 */

const { createCoreRouter } = require('@strapi/strapi').factories;

module.exports = createCoreRouter('api::grace.grace');

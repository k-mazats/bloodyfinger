'use strict';

/**
 * playstation service.
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::playstation.playstation');

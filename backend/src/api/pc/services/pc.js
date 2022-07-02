'use strict';

/**
 * pc service.
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::pc.pc');

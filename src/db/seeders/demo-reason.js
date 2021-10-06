'use strict';
const reasons = require('./data/data.js')

const createReasons = reasons.map((reason)=>{
  return {
    id: reason.key,
    value: reason.value,
    createdAt: new Date(),
    updatedAt: new Date()
  }
})

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Reasons',createReasons)
  },

  down: async (queryInterface, Sequelize) => {

    await queryInterface.bulkDelete('Reasons', null, {});

  }
};
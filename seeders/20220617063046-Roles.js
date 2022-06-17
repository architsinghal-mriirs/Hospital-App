'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * 
    */
     await queryInterface.bulkInsert('Roles', [{
         name: 'Admin',
         createdAt: new Date(),
         updatedAt: new Date()
       },
      {
        name: 'Doctor',
        createdAt: new Date(),
         updatedAt: new Date()
      },{
        name: 'Patient',
        createdAt: new Date(),
         updatedAt: new Date()
      }], {});
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * 
     */
     await queryInterface.bulkDelete('Roles', null, {});
  }
};

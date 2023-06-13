'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'Categories',
      [
        {
          title: 'Процессоры',
        },
        {
          title: 'Материнские платы',
        },
        {
          title: 'Оперативная память',
        },
        {
          title: 'Накопители',
        },
        {
          title: 'Видеокарты',
        },
        {
          title: 'Блоки питания',
        },
        {
          title: 'Корпуса',
        },
        {
          title: 'Охлаждение',
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Categories', null, {});
  },
};

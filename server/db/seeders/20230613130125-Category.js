'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'Categories',
      [
        {
          title: 'Процессор',
        },
        {
          title: 'Материнская плата',
        },
        {
          title: 'Оперативная память',
        },
        {
          title: 'Накопитель',
        },
        {
          title: 'Видеокарта',
        },
        {
          title: 'Блок питания',
        },
        {
          title: 'Корпус',
        },
        {
          title: 'Кулер',
        },
        {
          title: 'Водяное охлаждение',
        },
        {
          title: 'Звуковая карта',
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Categories', null, {});
  },
};

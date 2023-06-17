'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'Categories',
      [
        {
          title: 'Процессор',
          significance: 4,
          image: 'http://localhost:3000/images/category/processor.png',
        },
        {
          title: 'Материнская плата',
          significance: 3,
          image: 'http://localhost:3000/images/category/motherboard.png',
        },
        {
          title: 'Оперативная память',
          significance: 1,
          image: 'http://localhost:3000/images/category/fastmemory.png',
        },
        {
          title: 'Хранение данных (SSD/HDD)',
          significance: 1,
          image: 'http://localhost:3000/images/category/SSD.png',
        },
        {
          title: 'Видеокарта',
          significance: 0,
          image: 'http://localhost:3000/images/category/videocard.png',
        },
        {
          title: 'Блок питания',
          significance: 1,
          image: 'http://localhost:3000/images/category/powerblock.png',
        },
        {
          title: 'Корпус',
          significance: 2,
          image: 'http://localhost:3000/images/category/case.png',
        },
        {
          title: 'Кулер',
          significance: 0,
          image: 'http://localhost:3000/images/category/ventilator.png',
        },
        {
          title: 'Водяное охлаждение',
          significance: 0,
          image: 'http://localhost:3000/images/category/water.png',
        },
        {
          title: 'Звуковая карта',
          significance: 0,
          image: 'http://localhost:3000/images/category/soundcard.png',
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Categories', null, {});
  },
};

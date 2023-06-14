"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "Categories",
      [
        {
          title: "Процессор",
          significance: 2,
        },
        {
          title: "Материнская плата",
          significance: 3,
        },
        {
          title: "Оперативная память",
          significance: 1,
        },
        {
          title: "Хранение данных (SSD/HDD)",
          significance: 1,
        },
        {
          title: "Видеокарта",
          significance: 0,
        },
        {
          title: "Блок питания",
          significance: 1,
        },
        {
          title: "Корпус",
          significance: 4,
        },
        {
          title: "Кулер",
          significance: 0,
        },
        {
          title: "Водяное охлаждение",
          significance: 0,
        },
        {
          title: "Звуковая карта",
          significance: 0,
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Categories", null, {});
  },
};

"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "Categories",
      [
        {
          title: "Процессор",
          significance: 4,
          image: "",
        },
        {
          title: "Материнская плата",
          significance: 3,
          image: "",
        },
        {
          title: "Оперативная память",
          significance: 1,
          image: "",
        },
        {
          title: "Хранение данных (SSD/HDD)",
          significance: 1,
          image: "",
        },
        {
          title: "Видеокарта",
          significance: 0,
          image: "",
        },
        {
          title: "Блок питания",
          significance: 1,
          image: "",
        },
        {
          title: "Корпус",
          significance: 2,
          image: "",
        },
        {
          title: "Кулер",
          significance: 0,
          image: "",
        },
        {
          title: "Водяное охлаждение",
          significance: 0,
          image: "",
        },
        {
          title: "Звуковая карта",
          significance: 0,
          image: "",
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Categories", null, {});
  },
};

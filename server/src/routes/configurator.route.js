const router = require("express").Router();

const { Category, Item } = require("../../db/models");

router.get("/", async (req, res) => {
  try {
    const categoriesArrRaw = await Category.findAll({
      include: [{ model: Item }],
    });
    const categoriesArr = categoriesArrRaw.map((category) => {
      category.dataValues.amountItems = category.dataValues.Items.length;
      delete category.dataValues.Items;
      delete category.dataValues.createdAt;
      delete category.dataValues.updatedAt;
      return category.get({ plain: true });
    });
    console.log(categoriesArr);
    res.json(categoriesArr);
  } catch (error) {}
});

module.exports = router;

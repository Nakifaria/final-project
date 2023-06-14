const router = require("express").Router();

const { Category, Item } = require("../../db/models");

router.get("/", async (req, res) => {
  try {
    const categoriesArrRaw = await Category.findAll({
      include: [{ model: Item }],
      order: [["significance", "DESC"]],
    });
    const categoriesArr = categoriesArrRaw.map((category) => {
      category.dataValues.amountItems = category.dataValues.Items.length;
      delete category.dataValues.Items;
      delete category.dataValues.createdAt;
      delete category.dataValues.updatedAt;
      return category.get({ plain: true });
    });

    const primaryPartsTotalAmount = categoriesArr.filter(
      (category) => category.significance !== 0
    ).length;

    res.json({ categoriesArr, primaryPartsTotalAmount });
  } catch (error) {}
});

module.exports = router;

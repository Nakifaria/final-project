const router = require("express").Router();

const {
  Category,
  Item,
  Configuration,
  ItemsToConfiguration,
} = require("../../db/models");

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

router.post("/", async (req, res) => {
  try {
    const { title, description, itemIdArr } = req.body;
    const { user } = req.session;
    const newConfiguration = (
      await Configuration.create({
        title,
        description,
        user_id: user.id,
      })
    ).get({ plain: true });

    await Promise.all(
      itemIdArr.forEach(async (el) => {
        await ItemsToConfiguration.create({
          configuration_id: newConfiguration.id,
          item_id: el,
        });
      })
    );

    console.log(newConfiguration);
    // res.json({});
  } catch (error) {}
});

module.exports = router;

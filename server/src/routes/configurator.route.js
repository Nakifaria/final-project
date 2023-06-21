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
  } catch (error) {
    console.log(error);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { user } = req.session;
    // console.log("user====================>", user);
    const configuration = (
      await Configuration.findOne({
        include: [{ model: Item }],
        order: [["createdAt", "DESC"]],
        where: { user_id: user.id, id },
      })
    ).get({ plain: true });
    configuration.items = configuration.Items;
    delete configuration.Items;
    console.log(configuration);
    res.json(configuration);
  } catch (error) {
    console.log(error);
  }
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

    itemIdArr.forEach(async (el) => {
      await ItemsToConfiguration.create({
        configuration_id: newConfiguration.id,
        item_id: el,
      });
    });
    res.json(newConfiguration);
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;

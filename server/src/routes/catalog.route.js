const router = require('express').Router();
const { Category, Item } = require("../../db/models")

router.get('/', async (req, res) => {
    try {
        const catalogResult = await Category.findAll({ raw: true })
        // console.log(result);
        res.json(catalogResult)
    } catch (error) {
        console.log(error);
    }
})

router.get('/category/:id', async (req, res) => {
    try {
        const rawCategoryResult = await Item.findAll({ where: { category_id: req.params.id }, include: { model: Category, attributes: ['title'] } })
        const categoryResult = rawCategoryResult.map((el) => {
            el.dataValues.category = el.dataValues.Category.title
            delete el.dataValues.Category
            return el.get({ plain: true })
        })
        console.log(categoryResult);
        res.json(categoryResult)
    } catch (error) {
        console.log(error);
    }
})

router.get('/category/product/:id', async (req, res) => {
    try {
        const productResult = (await Item.findOne({ where: { id: req.params.id } })).get({ plain: true })
        // console.log(productResult);
        res.json(productResult)
    } catch (error) {
        console.log(error);
    }
})

module.exports = router;
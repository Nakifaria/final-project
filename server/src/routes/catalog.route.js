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
        const categoryResult = await Item.findAll({ where: { category_id: req.params.id }, raw: true })
        // console.log(categoryResult);
        res.json(categoryResult)
    } catch (error) {
        console.log(error);
    }
})

router.get('/category/product/:id', async (req, res) => {
    try {
        const productResult = await Item.findOne({ where: { id: req.params.id }, raw: true })
        // console.log(productResult);
        res.json(productResult)
    } catch (error) {
        console.log(error);
    }
})

module.exports = router;
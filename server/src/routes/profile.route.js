const router = require('express').Router();

const { Configuration, Cart } = require('../../db/models');

router.get('/configuration/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const configInfo = (
            await Configuration.findAll({
                where: { user_id: id },
                raw: true
            })
        )
        // console.log(configInfo);
        res.json(configInfo)
    } catch (error) {
        console.log(error);
    }
    res.end()
});

router.get('/orders/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const cartInfo = (
            await Cart.findAll({
                where: { user_id: id },
                raw: true
            })
        )
        console.log(cartInfo);
        res.json(cartInfo)
    } catch (error) {
        console.log(error);
    }
    res.end()
});

module.exports = router;

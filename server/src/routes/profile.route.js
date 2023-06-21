const router = require('express').Router();

const { Configuration, User, Cart } = require('../../db/models');

// router.get('/', async (req, res) => {
//     console.log("где он??", req.session.user);
//   try {
//     const userInfo = (
//       await User.findOne({
//         where: { id: req.session.user},
//       })
//     ).get({ plain: true })
//     console.log(userInfo);
//     res.json(userInfo)
//    } catch (error) {
//     console.log(error);
//   }
//     res.end()
// });

router.get('/configuration/:id', async (req, res) => {
    const { id } = req.params;
    console.log("парамсы где?", id);
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



module.exports = router;

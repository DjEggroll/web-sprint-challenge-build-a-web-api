// Write your "actions" router here!
const router = require('express').Router();

const Actions = require('./actions-model');

router.get('/', async (req, res, next) => {
    try {
        const actions = await Actions.get();
        res.json(actions);
    } catch (err) {
        next(err);
    }
})

router.get('/:id', async (req, res, next) => {
    try {
        const action = await Actions.get(req.params.id);
        if(!action) {
            res.status(404).json({
                message: "Invalid id"
            })
        } else {
            res.json(action)
        }
    } catch (err) {
        next(err)
    }
})

module.exports = router;
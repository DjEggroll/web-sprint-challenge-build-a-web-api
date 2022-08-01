// Write your "actions" router here!
const { validateExistingProject } = require('./actions-middlware');

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

router.post('/', validateExistingProject, async (req, res, next) => {
    try {
        const { project_id, description, notes } = req.body;
        if(!project_id || !description || !notes) {
            res.status(400).json({
                message: "Missing required fields"
            })
        } else {
            const newAction = await Actions.insert({ project_id, description, notes });
            res.json(newAction);
        }
    } catch (err) {
        next(err)
    }
})

router.put('/:id', async (req, res, next) => {
    try {
        const { description, notes, completed } = req.body;
        if(!description || !notes || completed == null) {
            res.status(400).json({
                message: "Missing required fields"
            })
        } else {
            const updatedAction = await Actions.update(req.params.id, {description, notes, completed});
            if (!updatedAction) {
                res.status(404).json({
                    message: "This action does not exist"
                })
            } else {
                res.json(updatedAction)
            }
        }
    } catch (err) {
        next(err)
    }
})

router.delete('/:id', async (req, res, next) => {
    try {
        const deletedAction = await Actions.remove(req.params.id);
        if (!deletedAction) {
            res.status(404).json({
                message: "This action does not exist"
            })
        } else {
            res.json(deletedAction)
        }
    } catch (err) {
        next(err)
    }
})

module.exports = router;
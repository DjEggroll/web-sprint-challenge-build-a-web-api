// Write your "projects" router here!
const router = require('express').Router();

const Projects = require('./projects-model');

router.get('/', async (req, res, next) => {
    const projects = await Projects.get();
    res.json(projects);
})

router.get('/:id', async (req, res, next) => {
    const project = await Projects.get(req.params.id);
    if (!project) {
        res.status(404).json({
            message: "The posts with the specified ID does not exist"
        });
    } else {
        res.json(project);
    }
});

router.post('/', async (req, res, next) => {
    const { name, description, completed } = req.body;
    if(!name || !description) {
        res.status(400).json({
            message: "missing required data fields"
        })
    } else {
        const newProject = await Projects.insert({name, description, completed});
        res.json(newProject);
    }
})

router.put('/:id', async (req, res, next) => {
    const { name, description, completed } = req.body;
    if(!name || !description || completed == null){
        res.status(400).json({
            message: "Missing required field input(s)"
        })
    } else {
        const updatedProject = await Projects.update(req.params.id, { name, description, completed });
        if(!updatedProject) {
            res.status(404).json({
                message: "This project does not exist"
            })
        } else {
            res.json(updatedProject)
        }
        console.log(updatedProject);
    }
})

router.delete('/:id', async (req, res, next) => {
    const deletedProject = await Projects.remove(req.params.id);
    if(!deletedProject) {
        res.status(404).json({
            message: "This project does not exist"
        })
    } else {
        res.status(200).json({
            message: "Delete successful"
        })
    }
})

router.get('/:id/actions', async (req, res, next) => {
    const projectActions = await Projects.getProjectActions(req.params.id);
    if (!projectActions) {
        res.status(404).json({
            message: "The posts with the specified ID does not exist"
        });
    } else {
        res.json(projectActions);
    }
});

module.exports = router
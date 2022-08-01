// add middlewares here related to actions
const Projects = require('../projects/projects-model');

async function validateExistingProject (req, res, next) {
    try {
        const { project_id } = req.body;
        const project = await Projects.get(project_id);
        if(!project) {
            next({status: 404, message: 'Project not found'})
        } else {
            next();
        }
    } catch (err) {
        next(err);
    }
}

module.exports = {
    validateExistingProject,
}
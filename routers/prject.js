const express = require('express');
const router = express.Router();

// accessing project_controller in variable
const projectController = require('../controllers/project_controller');

//routes for create the projec by clicking create new project buttotn
router.post('/create', projectController.create);

// routes for create issue bu clicking create-issue buton
router.post('/:id', projectController.createIssue);

// route for go to create project form page
router.get('/projectio', projectController.createProject)

// route for go to particular project page by clicking open-project button
router.get('/project-data/:id', projectController.project);

// route for go to issue form page by clicking create-issue button
router.get('/issue-form/:id', projectController.issueForm);

// route for show project issue/issues in different page
router.get('/show-issues/:id', projectController.showProjectIssues);

module.exports = router;

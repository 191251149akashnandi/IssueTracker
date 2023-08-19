const Project = require('../models/project');
const Issue = require('../models/issues');


// Controller for creating project as per Schema
module.exports.create = async (req, res) => {
    try {
        let project =await Project.create({
            name : req.body.name,
            description : req.body.description,
            author : req.body.author
        });
//         console.log('Created Project :', project)
        return res.redirect('/');
    } catch (error) {
//         console.log('Error In creating Project try again !!', error)
        return res.redirect('back')
    }
}


// controller for creating issues as per schema
module.exports.createIssue = async function (req, res) {
    try {
//         first we have to ensure that  if project is persent or not for which issue will be created
      let project = await Project.findById(req.params.id);
      if (project) {
        let issue = await Issue.create({
          title: req.body.title,
          description: req.body.description,
          labels: req.body.labels,
          author: req.body.author,
        });
//           pushing created issue id into project's issues arraylis
        project.issues.push(issue);
  
//           accessing labels with some condition
        if (!(typeof req.body.labels === 'string')) {
          for (let label of req.body.labels) {
            let isPresent = project.labels.find((obj) => obj == label);
            if (!isPresent) {
//                 if not ispresent then push labels= into labels
              project.labels.push(label);
            }
          }
        } else {
          let isPresent = project.labels.find((obj) => obj == req.body.labels);
          if (!isPresent) {
            project.labels.push(req.body.labels);
          }
        }
        await project.save();
        return res.redirect(`back`);
      } else {
        return res.redirect('back');
      }
    } catch (err) {
      return res.redirect('back');
    }
  };


// controller for rendering project form page
  module.exports.createProject =  (req, res) => {
  
    return res.render('project_form', {
      title: 'Create | Project-Form',
    });
  };

// controller for rendering  project page
  module.exports.project = async (req, res) => {
    try {
      let project = await Project.findById(req.params.id)
      .populate({
        path: 'issues',
      }).exec();

      if(project) {
        return res.render('project_page', {
          title: 'project | page',
          project : project
        })
      }

      return res.redirect('back');

    } catch (error) {
      console.log('Error', error);
      return;
    }
  }

//   controller for rendering issue for page
  module.exports.issueForm = async (req, res) => {

    try{ 
      let project = await Project.findById(req.params.id);
   if(project) {
    return res.render('issue_form', {
      title: 'Issue | Form',
      project,
    })
   }    

   return res.redirect('/');

    } catch (error) {

      console.log('Error', error);

    }
  }

//   controller for rendering project issues
  module.exports.showProjectIssues = async (req, res) => {
    try {
      let project =await Project.findById(req.params.id)
      .populate({
        path: 'issues',
      }).exec();

      return res.render('project_issues',{
        title: 'Project | Issues',
        project
      })
    } catch (error) {
      console.log('Error', error);
    }
  }

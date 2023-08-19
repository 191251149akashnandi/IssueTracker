const Project = require('../models/project');

// Controller for fetching an sending projects datas from database to home page
module.exports.home = async (req, res) => {
    try {
        let projects =await Project.find({}).sort('-createdAt');
        return res.render('home', {
            title : 'Issue-Tracker | Home',
            projects : projects
        })
    } catch (error) {
        console.log('Error', error);
    }
}

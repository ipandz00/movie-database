module.exports = function(app) {
 
    var actor = require('../controllers/actor.controller.js');

    // Retrieve actors by name
    app.get('/api/actors', actor.findAll);

}
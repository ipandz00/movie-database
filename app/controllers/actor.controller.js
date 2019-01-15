const Actor = require('../models/actorModel.js');
 
// FETCH all Actors
exports.findAll = (req, res) => {
    let query = {};
    const size = parseInt(req.query.size);

    if(req.query.name) {
       query.name = new RegExp(req.query.name, 'i');
    }

    Actor.find(query).limit(size)
    .then(actors => {
        res.json(actors);
    }).catch(err => {
        res.status(500).send({
            message: err.message
        });
    });
};
 
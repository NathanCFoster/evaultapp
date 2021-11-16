const model = require("../models/evault.models");

module.exports.findUser = (req, res) => {
    model.User.findById(req.params._id).then(e => res.json(e)).catch(e => res.json({error: e}));
}

module.exports.updateUser = (req, res) => {
    model.User.updateOne({_id: req.params._id}, req.body, { new:true, runValidators: true})
        .then(e => res.json(e))
        .catch(e => res.json({error:e}));
}

module.exports.createUser = (req, res) => {
    model.User.create(req.body)
        .then(e => res.json(e))
        .catch(e => res.json({error:e}));
}

module.exports.findUserByName = (req, res) => {
    model.User.find({username:req.params.username})
        .then(e => res.json(e))
        .catch(e => res.json(e));
}

module.exports.findUserByEmail = (req, res) => {
    model.User.find({email:req.params.email})
        .then(e => res.json(e))
        .catch(e => res.json({error:e}));
}

module.exports.deleteUser = (req, res) => {
    model.User.deleteOne({_id:req.params._id})
        .then(e => res.json(e))
        .catch(e => res.json({error: e}));
}

module.exports.findAllReviews = (req, res) => {
    model.Review.find()
        .sort({sentat: "asc"})
        .then(e => res.json(e))
        .catch(e => res.json({error: e}));
}

module.exports.findSpecPasswords = (req, res) => {
    model.Passwords.find({ownedby: req.params._id})
        .then(e => res.json(e))
        .catch(e => req.json({error: e}));
}
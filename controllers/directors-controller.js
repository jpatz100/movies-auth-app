const Director = require('../models/director');

const directorsController = {};

directorsController.index = (req, res) => {
  Director.findAll()
  .then(directors => {
    res.render('directors/index', { directors: directors });
  }).catch(err => {
    res.status(400).json(err);
  });
}

directorsController.show = (req, res) => {
  Director.findById(req.params.id)
  .then(director => {
    res.render('directors/show', { director: director });
  }).catch(err => {
    res.status(400).json(err);
  });
};

directorsController.edit = (req, res) => {
  Director.findById(req.params.id)
  .then(director => {
    res.render('directors/edit', { director: director });
  }).catch(err => {
    res.status(400).json(err);
  });
};

directorsController.update = (req, res) => {
  Director.update({ 
    first_name: req.body.first_name,
    last_name: req.body.last_name
  }, req.params.id)
  .then(() => {
    res.redirect(`/directors/${req.params.id}`)
  }).catch(err => {
    res.status(400).json(err);
  });
};

directorsController.new = (req, res) => {
  res.render('directors/new')
};

directorsController.create = (req,res) => {
  Director.create({
    first_name: req.body.first_name,
    last_name: req.body.last_name
  })
  .then(director => {
    res.redirect(`/directors/${director.id}`)
  }).catch(err => {
    res.status(400).json(err);
  });
};

directorsController.destroy = (req, res) => {
  Director.destroy(req.params.id)
  .then(() => {
    res.redirect('/directors')
  }).catch(err => {
    res.status(400).json(err);
  });
};

module.exports = directorsController;
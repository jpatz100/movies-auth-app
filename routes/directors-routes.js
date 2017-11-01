const express = require('express');
const directorsController = require('../controllers/directors-controller');
const directorsRouter = express.Router();

directorsRouter.get('/', directorsController.index);
directorsRouter.get('/new', directorsController.new);
directorsRouter.get('/:id', directorsController.show);
directorsRouter.get('/:id/edit', directorsController.edit);
directorsRouter.put('/:id', directorsController.update);
directorsRouter.post('/', directorsController.create);
directorsRouter.delete('/:id', directorsController.destroy);

module.exports = directorsRouter;
const router = require('express').Router();

const {
  getCategories,
  getResources,
  getOneResource,
  newResource,
  editResource,
  deleteResource,
} = require('./controller');

const { resourceValidation } = require('./validation');

router.get('/categories', getCategories);
router.get('/c/:category', getResources);
router.get('/:id', getOneResource);
router.post('/edit/:id', resourceValidation, editResource);
router.post('/', resourceValidation, newResource);
router.delete('/:id', deleteResource);

module.exports = router;

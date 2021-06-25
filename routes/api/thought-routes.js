const router = require('express').Router();
const {getAllThoughts, getSingleThought, createThought, updateThought, deleteThought} = require('../../controllers/thought-controller');

//Routes /api/thoughts
router.route('/')
.get(getAllThoughts)
.post(createThought);

//Routes /api/thoughts/:id
router.route('/:id')
.get(getSingleThought)
.put(updateThought)
.delete(deleteThought);

module.exports = router;
const router = require('express').Router();
const {getAllThoughts, getSingleThought, createThought, updateThought, deleteThought, addReaction, deleteReaction} = require('../../controllers/thought-controller');

//Routes /api/thoughts
router.route('/')
.get(getAllThoughts)
.post(createThought);

//Routes /api/thoughts/:id
router.route('/:id')
.get(getSingleThought)
.put(updateThought)
.delete(deleteThought);

//Routes /api/thoughts/:thoughtId/reactions
router.route('/:thoughtId/reactions')
.put(addReaction);

//Routes /api/thoughts/:thoughtId/reactions/:reactionId
router.route('/:thoughtId/reactions/:reactionId')
.delete(deleteReaction);

module.exports = router;
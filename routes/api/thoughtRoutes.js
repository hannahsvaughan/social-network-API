const router = require('express').Router();

const {
    getThought,
    getThoughtById,
    createThought,
    updateThought,
    deleteThought,
    createReaction,
    deleteReaction
} = require('../../controllers/thoughtController');

// api / thought
router.route("/").get(getThought).post(createThought);

// api / thought / :thoughtId
router.route("/:thoughtId").get(getThoughtById).delete(deleteThought).put(updateThought);

// api / thought / :thoughtId / reactions
router.route("/:thoughtId/reactions").post(createReaction);

// api / thought / :thoughtId / reactions / :reactionId
router.route("/:thoughtId/reactions/:reactionId").delete(deleteReaction);

module.exports = router;
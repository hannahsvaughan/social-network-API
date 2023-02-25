const { ObjectId } = require("mongoose").Types;
const { Thought } = require("../models");

// GET ALL THOUGHTS
module.exports = {
  getThought(req, res) {
    Thought.find({}, (err, result) => {
      if (result) {
        res.status(200).json(result);
      } else {
        res.status(500).json({ error: "Error " });
      }
    });
  },
  // GET ONE THOUGHT BY ID
  getThoughtById(req, res) {
    Thought.findOne({ _id: req.params.thoughtId })
      .select("-_v")
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: "No thought with that ID" })
          : res.json({
              thought,
            })
      )
      .catch((err) => {
        return res.status(500).json(err);
      });
  },
  // POST TO CREATE NEW THOUGHT (don't forget to push the created thought's id to the associated user's thoughts array field)
  createThought(req, res) {
    Thought.create(req.body)
      .then((thought) => {
        return User.findOneAndUpdate(
          { username: req.body.username },
          { $addToSet: { thoughts: thought._id } },
          { new: true }
        );
      })
      .then((user) =>
        !user
          ? res.status(404).json({ message: "No user found for this thought" })
          : res.json("Created the Thought")
      )
      .catch((err) => res.json(500).json(err));
  },
  // PUT TO UPDATE THOUGHT BY ITS ID
  updateThought(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $set: req.body },
      { runValidators: true, new: true }
    )
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: "No thought found with this ID" })
          : res.json(thought)
      )
      .catch((err) => res.status(500).json(err));
  },

  // DELETE TO REMOVE THOUGHT BY ITS ID
  deleteThought(req, res) {
    Thought.findOneAndDelete({ _id: req.params.thoughtId }, (err, result) => {
      if (result) {
        res.status(200).json(result);
      } else {
        res.status(500).json({ message: "Failed to delete thought." });
      }
    });
  },
  // POST TO CRETE REACTION STORED IN SINGLE THOUGHTS REACTION ARRAY FIELD
  createReaction(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $addToSet: { reactions: req.body } },
      { runValidators: true, new: true }
    )
      .then((thought) =>
        !thought
          ? res.status(400).json({ message: "No thought with that ID" })
          : res.jason(thought)
      )
      .catch((err) => res.status(500).json(err));
  },

  // DELETE REACTION BY ID
  deleteReaction(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $pull: { reactions: { reactionId: req.params.reactionId } } },
      { runValidators: true, new: true }
    )
      .then((thought) =>
        !thought
          ? res.status(400).json({ message: "No thought with that ID" })
          : res.jason(thought)
      )
      .catch((err) => res.status(500).json(err));
  },
};

const { ObjectId } = require("mongoose").Types;
const { User } = require("../models");

module.exports = {
  // GET ALL USERS
  getAllUsers(req, res) {
    User.find({}, (err, result) => {
      if (result) {
        res.status(200).json(result);
      } else {
        res.status(500).json({ error: "Error :(" });
      }
    });
  },
  // GET ONE USER BY ID
  getOneUser(req, res) {
    User.findOne({ _id: req.params.userId })
      .select("-__v")
      .then((user) =>
        !user
          ? res.status(404).json({ message: "No user found with that ID :(" })
          : res.json({
              user,
            })
      )
      .catch((err) => {
        return res.status(500).json(err);
      });
  },
  // POST TO CREATE A NEW USER
  createUser(req, res) {
    User.create(req.body)
      .then((user) => res.json(user))
      .catch((err) => res.status(500).json(err));
  },
  // PUT TO UPDATE A USER BY ITS ID
  updateUser(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $set: req.body },
      { runValidators: true, new: true }
    )
    .then((user) => 
    !user
    ? res.status(404).json({ message: 'No user with this Id!' })
    : res.json(user)
    )
    .catch((err) => re.sstatus(500).json(err));
  },
  // DELETE TO REMOVE USER BY ITS ID
  deleteUser(req, res) {
    User.findOneAndDelete({ _id: req.params.userId }, (err, result) => {
      if (result) {
        res.status(200).json(result);
      } else {
        res.status(500).json({ message: "Failed to delete user :(" });
      }
    });
  },
  // POST TO ADD A NEW FRIEND TO USERS FRIEND LIST
  addFriend(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $addToSet: { friends: req.params.friendId } },
      { runValidators: true, new: true }
    )
      .then((user) =>
        !user
          ? res.status(404).json({ message: "No user with that Id :(" })
          : res.json(user)
      )
      .catch((err) => res.status(500).json(err));
  },
  // DELETE TO REMOVE FRIEND FROM USERS FRIEND LIST
  deleteFriend(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $pull: { friends: req.params.friendId } },
      { runValidators: true, new: true }
    )
      .then((user) =>
        !user
          ? res.status(404).json({ message: "No user with that Id :(" })
          : res.json(user)
      )
      .catch((err) => res.status(500).json(err));
  },
};

const router = require('express').Router();

const {
    getAllUsers,
    getOneUser,
    createUser,
    updateUser,
    deleteUser,
    addFriend,
    deleteFriend
} = require('../../controllers/userController');

// api / user
router.route("/").get(getAllUsers).post(createUser);

// api / user / :userId
router.route("/:userId").get(getOneUser).delete(deleteUser).put(updateUser);

// api / user / :userId / friends
router.route("/:userId/friends/:friendId").post(addFriend);

// api / user / :userId / friends / :friendId
router.route("/:userId/friends/:friendId").delete(deleteFriend);

module.exports = router;
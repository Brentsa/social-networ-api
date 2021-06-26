//import database methods from the controller and the express router
const router = require('express').Router();
const {getAllUsers, getSingleUser, createUser, updateUser, deleteUser, addFriend, deleteFriend} = require('../../controllers/user-controller');

//route /api/users
router.route('/')
.get(getAllUsers)
.post(createUser);

//route /api/users/:id
router.route('/:id')
.get(getSingleUser)
.put(updateUser)
.delete(deleteUser);

router.route('/:userId/friends/:friendId')
.put(addFriend)
.delete(deleteFriend);

module.exports = router
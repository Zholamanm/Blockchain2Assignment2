const Router = require("express");
const UserControllers = require("../controllers/userControllers");
const AuthMiddleware = require("../middlewares/authMiddleware");

const router = new Router();

router.get('/profile', AuthMiddleware, UserControllers.getProfile);
router.put('/profile', AuthMiddleware, UserControllers.updateProfile);
// router.patch('/:id', AuthMiddleware, UserControllers.updateProfile);

module.exports = router;
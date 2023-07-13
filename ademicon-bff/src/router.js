const express = require("express");
const clientsController = require("./controllers/clientsController");
const authController = require("./controllers/authController");
const { verifyToken  } = require("./middlewares/authMiddleware");

const router = express.Router();

router.post('/auth/register', authController.registerUser);
router.post('/auth', authController.loginUser);

router.get("/", verifyToken, clientsController.getAll);
router.post('/', verifyToken, clientsController.registerClient);
router.put('/:id', verifyToken, clientsController.updateClient);
router.get('/:id', verifyToken, clientsController.getClient);
router.delete('/:id', verifyToken, clientsController.deleteClient);

module.exports = router;
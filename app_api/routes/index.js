const express = require('express');
const router = express.Router();
const tripsController = require('../controllers/trips');
const authController = require("../controllers/authentication");
const { authenticateJWT } = require('../middleware/auth');

router.route("/register").post(authController.register);
router.route("/login").post(authController.login);

router.get('/trips', tripsController.tripsList);
router.get('/trips/:tripCode', tripsController.tripsFindByCode);
router.post('/trips', authenticateJWT, tripsController.tripsAddTrip);
router.put('/trips/:tripCode', authenticateJWT, tripsController.tripsUpdateTrip);
router.delete('/trips/:tripCode', authenticateJWT, tripsController.tripsDeleteTrip);

module.exports = router;  
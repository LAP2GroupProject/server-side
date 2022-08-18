const express = require("express");
const router = express.Router();
const habitsController = require("../controllers/habits");
const verifyToken = require("../middleware/verifyToken");



router.use(verifyToken)

router.get('/', habitsController.habitIndex);
router.post('/', habitsController.create);
router.get('/:id', habitsController.getHabits)

router.get('/currentUser', habitsController.getHabitsById)
router.post('/complete', habitsController.completeHabit)

module.exports = router
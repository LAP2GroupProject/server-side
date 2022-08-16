const express = require("express");
const router = express.Router();
const habitsController = require("../controllers/habits");

router.get('/', habitsController.index);
router.get('/:id', habitsController.show);
router.post('/', habitsController.create);
router.patch('/:id', habitsController.patch)

<<<<<<< HEAD
router.delete('/:id', habitsController.destroy);
=======
router.get('/', habitsController.habitIndex);
router.post('/', habitsController.create);

>>>>>>> 3b36581195eb0dba6132cbfeb9403d681b3d30d5


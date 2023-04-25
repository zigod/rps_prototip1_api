var express = require('express');
var router = express.Router();
var usersController = require('../controllers/usersController.js');

/*
 * GET
 */
router.get('/all', usersController.list);

/*
 * GET
 */
router.get('/:id', usersController.show);
router.post('/login', usersController.login);
router.post('/register', usersController.register);
/*
 * POST
 */
router.post('/', usersController.create);

/*
 * PUT
 */
router.put('/:id', usersController.update);

/*
 * DELETE
 */
router.delete('/:id', usersController.remove);



module.exports = router;

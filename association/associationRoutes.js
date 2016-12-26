var express = require('express');
var router = express.Router();
var associationController = require('./associationController.js');

/*
 * GET
 */
router.get('/', associationController.list);

/*
 * GET
 */
router.get('/:id', associationController.show);

/*
 * POST
 */
router.post('/', associationController.create);

/*
 * PUT
 */
router.put('/:id', associationController.update);

/*
 * DELETE
 */
router.delete('/:id', associationController.remove);

module.exports = router;

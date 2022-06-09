const express = require('express');
const router = express.Router();

const fileCtrl = require('../controllers/filesControl');

router.get('/', fileCtrl.getAllFile);
router.post('/', fileCtrl.saveProgramFile);
router.delete('/:url', fileCtrl.deleteFile);

module.exports = router;
const express = require('express')
const router = express.Router()
const passport = require('passport')
const multer  = require('multer')
const storage = multer.memoryStorage()
const upload = multer({ storage: storage })

const manageStudentController = require('../../app/controllers/admin/ManageStudentController');

router.get('/', manageStudentController.index);

router.get('/updatestudent/:id', manageStudentController.updateGet);
router.post('/updatestudent/:id', upload.single('image'), manageStudentController.updatePost);

router.get('/delstudent/:id', manageStudentController.delstudent);

module.exports = router;

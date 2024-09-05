const express = require('express');
const router = express.Router();
const employeesControllers = require('../controllers/employeesControllers');



router.get('/empleados', employeesControllers.getAllEmployees);

router.post('/create' ,employeesControllers.createEmployee);

router.put('/update/:id', employeesControllers.updateEmployee);

router.delete('/delete/:id', employeesControllers.deleteEmployee);


module.exports = router;
const employeeService = require("../services/employeeServices");

// GET EMPLOYEES

const getAllEmployees = async (req, res) => {
  try {
    const employees = await employeeService.getAllEmployees();
    /*       console.log('Empleados:', employees);
     */
    res.json(employees);
  } catch (error) {
    console.error("Error en el controlador:", error.message);
    res.status(500).send(error.message);
  }
};

// NEW EMPLOYEE

const createEmployee = async (req, res) => {
  const { name, age, employee, seniority } = req.body;
  console.log(req.body)

  if (!name || !age || !employee || !seniority) {
    return res
      .status(400)
      .json({ error: "Faltan datos para crear el empleado" });
  }
  if (typeof age !== "number" || typeof seniority !== "number") {
    return res
      .status(400)
      .json({ error: "La edad y la senioridad deben ser números." });
  }
  try {
    const newEmployee = await employeeService.createEmployee({
      name,
      age,
      employee,
      seniority,
    });

    res.status(201).json(newEmployee);
  } catch (error) {
  
    console.error(
      "Error en el controlador para crear el empleado:",
      error.message
    );
    res.status(500).send(error.message);
  }
};

//UPDATE EMPLOYEE

const updateEmployee = async (req, res) => {
  const { id } = req.params; //capturamos el id del empleado
  const { name, age, employee, seniority } = req.body;
  console.log('Datos recibidos en createEmployee:', req.body);

  if (!name || !age || !employee || !seniority) {
    return res
      .status(400)
      .json({ error: "Faltan datos para actualizar el empleado" });
  }
  try {
    const result = await employeeService.updateEmployee(id, {
      name,
      age,
      employee,
      seniority,
    });
    res.status(201).json(result);

  } catch (error) {
  
    console.error("error", error);
    res.status(500).send(error.message);
  }
};

//DELETE EMPLOYEE

const deleteEmployee = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await employeeService.deleteEmployee(id);
    res.send(result);
  } catch (error) {
    console.error("error en el controlador para eliminar el empleado", error);
    res.status(500).send(error.message);
  }
};
module.exports = {
  getAllEmployees,
  createEmployee,
  updateEmployee,
  deleteEmployee,
};

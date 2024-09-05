const db = require("../db");

// GET ALL EMPLOYEES

const getAllEmployees = async () => {
  try {
    const result = await db.query("SELECT * FROM empleados");
    return result; 
  } catch (error) {
    console.log("Error al obtener los empleados", error.message);
    throw error; 
  }
};




//ADD NEW EMPLOYEE

const createEmployee = async (employeeData) => {
  const { name, age, employee, seniority } = employeeData;
   if (!name || !age || !employee || !seniority) {
    throw new Error('Faltan datos necesarios para crear el empleado.');
  }
  if (typeof age !== 'number' || typeof seniority !== 'number') {
    throw new Error('Edad y senioridad deben ser números.');
}
try {
  const result = await db.query(
    "INSERT INTO empleados(name, age, employee, seniority) VALUES (?, ?, ?, ?)",
    [name, age, employee, seniority]
  );
  
  return result;
} catch (error) {
  console.log("Error al crear el empleado:", error.message);
  throw error;
}
};

//UPDATE EMPLOYEES
const updateEmployee = async (id,employeeData) => {
  
  const { name, age, employee, seniority } = employeeData;
  try {
    const result = await db.query(
      "UPDATE empleados SET name=?,age=?,employee=?,seniority=? WHERE id =?",
      [name, age, employee, seniority, id]
    );
    console.log('Se ha actualizado el empleado', result)
    return result;
  } catch (error) {
    console.log("Error en actualizar los empleados", error.message);
    throw error
  }
};

// DELETE EMPLOYEE
const deleteEmployee = async (id) => {
  try {
    const result = await db.query("DELETE FROM empleados WHERE id=?", [id]);
    return result;
  } catch (error) {
    console.log("Error en borrar el empleado", error.message);
    throw error
  }
};


 
module.exports = {
  getAllEmployees,
      createEmployee,
    updateEmployee,
    deleteEmployee,
   
};

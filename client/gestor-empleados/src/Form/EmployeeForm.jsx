
import { useState } from "react";
import { addEmployee } from "../axiosCrud/employeeCrud";
import Swal from "sweetalert2";

export default function EmployeeForm () {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [employee, setEmployee] = useState('');
  const [seniority, setSeniority] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const employeeData = {
      name,
      age: parseInt(age),
      employee,
      seniority: parseInt(seniority)
    };
    try {
      await addEmployee(employeeData)
      .then(() => {
        Swal.fire({
          title: "<strong>Employee registered successfully</strong>",
          html: `<strong>${name}</strong> fue registrado con éxito`,
          icon: "success",
          timer: 3000,
        });
      })
    } catch (error) {
      console.error('Error adding employee:', error);
    }
  };
  

  return (
    <>
     <form onSubmit={handleSubmit}>
    <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" />
    <input type="number" value={age} onChange={(e) => setAge(e.target.value)} placeholder="Age" />
    <input type="text" value={employee} onChange={(e) => setEmployee(e.target.value)} placeholder="Employee ID" />
    <input type="number" value={seniority} onChange={(e) => setSeniority(e.target.value)} placeholder="Seniority" />
    <button type="submit">Add Employee</button>
  </form>
    </>
   
  )
}

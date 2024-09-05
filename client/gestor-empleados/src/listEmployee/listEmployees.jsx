import { useState,useEffect } from "react";
import { getEmployees } from "../axiosCrud/employeeCrud";
/* import Swal from "sweetalert2"; */

export default function ListEmployess() {

    const [employees, setEmployees] = useState([])

    useEffect(() => {
        const fetchEmployees = async () => {
          try {
            const data = await getEmployees();
            setEmployees(data);
            console.log(data)
          } catch (error) {
            console.error('Error fetching employees:', error);
          }
        };
        fetchEmployees();
      }, []);
    

  return (
    <div>
    <h1>Lista de empleados</h1>
    <ul>
        {
            employees.map(employee =>(
                <li key={employee.id}>{employee.name}</li>
            ))
      
        }
    </ul>
    </div>
  )
}

// queda llamar las demas funciones y estilizar

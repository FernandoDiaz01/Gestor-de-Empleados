import { api } from "../baseURL/apiBase";

// GET

const getEmployees = async ()=>{
    try {
        const response = await api.get('/empleados');
        return response.data
    } catch (error) {
        console.error('Error en obtener los empleados desde el front:', error);
    throw error;
    }
}

// POST

const addEmployee = async (employeeData)=>{
    try {
        const response = await api.post('/create', employeeData)
        console.log(response)
        return response.data
        
    } catch (error) {
        console.error('Error en agregar los empleados desde el front:', error);
    throw error; 
    }
}

//PUT
const updateEmployee = async(id,employeeData)=>{
    try {
        const response = await api.put(`update/${id}`,employeeData)
        return response.status === 200;
    } catch (error) {
        console.error('Error en actualizar los empleados desde el front:', error);
        throw error;
    }
}

// DELETE

const deleteEmployee = async (id)=>{
    try {
        const response = await api.delete(`/delete/${id}`)
        return response.data
    } catch (error) {
        console.error('Error en borrar los empleados desde el front:', error);
        throw error;
    }
}

export { getEmployees, addEmployee, updateEmployee, deleteEmployee}
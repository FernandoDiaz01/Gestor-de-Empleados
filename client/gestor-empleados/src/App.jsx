/* import { useState } from "react";
import {
  Container,
  Card,
  CardHeader,
  CardContent,
  CardActions,
  TextField,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Grid,
} from "@mui/material";
import { Edit, Delete, PersonAdd, Cancel } from "@mui/icons-material";
import Axios from "axios";
import Swal from "sweetalert2";

function App() {
  const [name, setName] = useState("");
  const [age, setAge] = useState(0);

  const [employee, setEmployee] = useState("");
  const [seniority, setSeniority] = useState(0);
  const [idEmployee, setIdEmployee] = useState();
  const [edit, setEdit] = useState(false);
  const [listEmployees, setListEmployees] = useState([]);

  const editEmployee = (val) => {
    setEdit(true);
    setName(val.name);
    setAge(val.age);
    setEmployee(val.employee);
    setSeniority(val.seniority);
    setIdEmployee(val.id);
  };

  const getEmployee = () => {
    Axios.get("http://localhost:3001/empleados")
      .then((response) => {
        setListEmployees(response.data);
        Swal.fire("Employees obtained", "", "success");
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "No se pudo obtener los empleados",
          footer: JSON.parse(JSON.stringify(error)).message,
        });
      });
  };

  const addEmployee = () => {
    Axios.post("http://localhost:3001/create", {
      name,
      age,
    
      employee,
      seniority,
    })
      .then(() => {
        getEmployee();
        cancelEdit();
        Swal.fire({
          title: "<strong>Employee registered successfully</strong>",
          html: `<strong>${name}</strong> fue registrado con éxito`,
          icon: "success",
          timer: 3000,
        });
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "No se pudo registrar el empleado",
          footer: JSON.parse(JSON.stringify(error)).message,
        });
      });
  };

  const updateEmployee = () => {
    Axios.put("http://localhost:3001/update", {
      id: idEmployee,
      name,
      age,
 
      employee,
      seniority,
    })
      .then(() => {
        getEmployee();
        cancelEdit();
        Swal.fire({
          title: "<strong>Employee updated successfully</strong>",
          html: `<strong>${name}</strong> fue actualizado con éxito`,
          icon: "success",
          timer: 5000,
        });
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "No se pudo actualizar el empleado",
          footer: JSON.parse(JSON.stringify(error)).message,
        });
      });
  };

  const deleteEmployee = (val) => {
    Swal.fire({
      title: "Are you sure?",
      html: `Desea eliminar a <strong>${val.name}</strong>?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        Axios.delete(`http://localhost:3001/delete/${val.id}`)
          .then(() => {
            getEmployee();
            cancelEdit();
            Swal.fire("Deleted!", `${val.name} fue eliminado`, "success");
          })
          .catch((error) => {
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: "No se pudo eliminar el empleado",
              footer: JSON.parse(JSON.stringify(error)).message,
            });
          });
      }
    });
  };

  const cancelEdit = () => {
    setEdit(false);
    setName("");
    setAge(0);

    setEmployee("");
    setSeniority(0);
    setIdEmployee("");
  };

  return (
    <Container maxWidth="md" style={{ marginTop: "20px" }}>
      <Card>
        <CardHeader title="Employee Manager" />
        <CardContent>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Age"
                type="number"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                variant="outlined"
              />
            </Grid>
          
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Employee"
                value={employee}
                onChange={(e) => setEmployee(e.target.value)}
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Seniority"
                type="number"
                value={seniority}
                onChange={(e) => setSeniority(e.target.value)}
                variant="outlined"
              />
            </Grid>
          </Grid>
        </CardContent>
        <CardActions style={{ justifyContent: "center" }}>
          {edit ? (
            <>
              <Button
                variant="contained"
                color="warning"
                startIcon={<Edit />}
                onClick={updateEmployee}
              >
                Update
              </Button>
              <Button
                variant="outlined"
                color="secondary"
                startIcon={<Cancel />}
                onClick={cancelEdit}
              >
                Cancel
              </Button>
            </>
          ) : (
            <Button
              variant="contained"
              color="primary"
              startIcon={<PersonAdd />}
              onClick={addEmployee}
            >
              Add Employee
            </Button>
          )}
          <Button variant="contained" color="success" onClick={getEmployee}>
            Get Employees
          </Button>
        </CardActions>
      </Card>
      <TableContainer component={Paper} style={{ marginTop: "20px" }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>#</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Age</TableCell>
           
              <TableCell>Employee</TableCell>
              <TableCell>Seniority</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {listEmployees.map((empl) => (
              <TableRow key={empl.id}>
                <TableCell>{empl.id}</TableCell>
                <TableCell>{empl.name}</TableCell>
                <TableCell>{empl.age}</TableCell>
                <TableCell>{empl.employee}</TableCell>
                <TableCell>{empl.seniority}</TableCell>
                <TableCell>
                  <IconButton
                    color="info"
                    onClick={() => editEmployee(empl)}
                  >
                    <Edit />
                  </IconButton>
                  <IconButton
                    color="error"
                    onClick={() => deleteEmployee(empl)}
                  >
                    <Delete />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
}

export default App;
 */

import { default as EmployeeForm } from "./Form/EmployeeForm";
import ListEmployess from "./listEmployee/listEmployees";

function App(){
  return(
    <>
    <ListEmployess/>
    <EmployeeForm/>
    </>
  )
}

export default App;
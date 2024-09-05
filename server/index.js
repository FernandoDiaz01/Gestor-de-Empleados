const express = require('express')
const app = express();
const cors = require('cors')
const employeeRoutes = require('./routes/employeeRoutes')

app.use(cors());
app.use(express.json())

app.use('/api',employeeRoutes)

const PORT = process.env.PORT || 3001;

app.listen(PORT,()=>{
    console.log(`Servidor escuchando en el puerto ${PORT}`)
})
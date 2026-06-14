const express = require('express');
const app = express();
const PORT = 3000;

// Middleware para entender JSON en las peticiones
app.use(express.json());

// Importar y usar las rutas
const tareasRoutes = require('./routes');
app.use('/api/tareas', tareasRoutes);

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
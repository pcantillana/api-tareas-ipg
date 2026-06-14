// routes.js
const express = require('express');
const router = express.Router();
let tareas = require('./data');

// 1. GET: Listar todas las tareas
router.get('/', (req, res) => {
    res.status(200).json(tareas);
});

// 2. GET: Obtener una tarea por ID
router.get('/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const tarea = tareas.find(t => t.id === id);
    
    if (!tarea) {
        return res.status(404).json({ error: "Tarea no encontrada" });
    }
    res.status(200).json(tarea);
});

// 3. POST: Crear una nueva tarea
router.post('/', (req, res) => {
    const { titulo, descripcion, completada } = req.body;

    // Validación básica
    if (!titulo || typeof titulo !== 'string') {
        return res.status(400).json({ error: "El campo 'titulo' es obligatorio y debe ser texto." });
    }
    if (completada !== undefined && typeof completada !== 'boolean') {
        return res.status(400).json({ error: "El campo 'completada' debe ser un valor booleano (true/false)." });
    }

    const nuevaTarea = {
        id: tareas.length + 1, // ID automático
        titulo: titulo,
        descripcion: descripcion || "Sin descripción",
        completada: completada !== undefined ? completada : false
    };

    tareas.push(nuevaTarea);
    res.status(201).json({ mensaje: "Tarea creada exitosamente", tarea: nuevaTarea });
});

// 4. PUT: Actualizar una tarea existente
router.put('/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const { titulo, descripcion, completada } = req.body;
    
    const index = tareas.findIndex(t => t.id === id);
    
    if (index === -1) {
        return res.status(404).json({ error: "Tarea no encontrada" });
    }

    // Validación al actualizar
    if (titulo && typeof titulo !== 'string') {
        return res.status(400).json({ error: "El campo 'titulo' debe ser texto." });
    }
    if (completada !== undefined && typeof completada !== 'boolean') {
        return res.status(400).json({ error: "El campo 'completada' debe ser booleano." });
    }

    // Actualizamos solo los campos que se envíen
    tareas[index] = {
        ...tareas[index],
        titulo: titulo !== undefined ? titulo : tareas[index].titulo,
        descripcion: descripcion !== undefined ? descripcion : tareas[index].descripcion,
        completada: completada !== undefined ? completada : tareas[index].completada
    };

    res.status(200).json({ mensaje: "Tarea actualizada exitosamente", tarea: tareas[index] });
});

// 5. DELETE: Eliminar una tarea
router.delete('/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const index = tareas.findIndex(t => t.id === id);

    if (index === -1) {
        return res.status(404).json({ error: "Tarea no encontrada" });
    }

    const tareaEliminada = tareas.splice(index, 1);
    res.status(200).json({ mensaje: "Tarea eliminada exitosamente", tarea: tareaEliminada[0] });
});

module.exports = router;
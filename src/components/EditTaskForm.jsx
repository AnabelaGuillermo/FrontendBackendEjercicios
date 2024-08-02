import { useState, useEffect } from "react";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:3000';

const EditTaskForm = ({ taskId, onTaskUpdated }) => {
  const [task, setTask] = useState(null);

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const response = await fetch(`${BACKEND_URL}/tasks/${taskId}`);
        if (!response.ok) {
          throw new Error("No se pudo recuperar la tarea.");
        }
        const taskData = await response.json();
        setTask(taskData);
      } catch (error) {
        console.error("Error al recuperar la tarea:", error);
      }
    };

    if (taskId) {
      fetchTask();
    }
  }, [taskId]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch(`${BACKEND_URL}/tasks/${taskId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(task),
      });

      if (!response.ok) {
        throw new Error("No se pudo actualizar la tarea.");
      }

      const updatedTask = await response.json();
      console.log("Tarea actualizada:", updatedTask);
      if (onTaskUpdated) onTaskUpdated(updatedTask);
    } catch (error) {
      console.error("Error al actualizar la tarea:", error);
    }
  };

  if (!task) return <div>Cargando...</div>;

  return (
    <form onSubmit={handleSubmit}>
      <h2>Editar tarea</h2>
      <label>
        Nombre:
        <input
          type="text"
          value={task.name}
          onChange={(e) => setTask({ ...task, name: e.target.value })}
          required
        />
      </label>
      <br />
      <label>
        Descripción:
        <textarea
          value={task.description}
          onChange={(e) => setTask({ ...task, description: e.target.value })}
        />
      </label>
      <br />
      <button type="submit">Actualizar tarea</button>
    </form>
  );
};

export default EditTaskForm;

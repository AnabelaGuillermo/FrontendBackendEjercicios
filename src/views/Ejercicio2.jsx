import { useState, useEffect } from "react";
import AddTaskForm from "../components/AddTaskForm";
import EditTaskForm from "../components/EditTaskForm";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const Ejercicio2 = () => {
  const [tasks, setTasks] = useState([]);
  const [editingTaskId, setEditingTaskId] = useState(null);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await fetch(`${BACKEND_URL}/tasks`);
        if (!response.ok) {
          throw new Error("No se pudieron recuperar las tareas.");
        }
        const tasksData = await response.json();
        setTasks(tasksData);
      } catch (error) {
        console.error("Error al recuperar tareas:", error);
      }
    };

    fetchTasks();
  }, []);

  const handleDelete = async (taskId) => {
    try {
      const response = await fetch(`${BACKEND_URL}/tasks/${taskId}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("No se pudo eliminar la tarea.");
      }

      setTasks(tasks.filter((task) => task._id !== taskId));
      console.log("Tarea eliminada.");
    } catch (error) {
      console.error("Error al eliminar tarea:", error);
    }
  };

  return (
    <div>
      <h1>Administración de tareas</h1>
      <AddTaskForm />

      <h2>Lista de tareas</h2>
      <ul>
        {tasks.map((task) => (
          <li key={task._id}>
            {task.name} - {task.description}
            <button onClick={() => setEditingTaskId(task._id)}>Editar</button>
            <button onClick={() => handleDelete(task._id)}>Eliminar</button>
          </li>
        ))}
      </ul>

      {editingTaskId && (
        <EditTaskForm
          taskId={editingTaskId}
          onTaskUpdated={(updatedTask) => {
            setTasks(
              tasks.map((task) =>
                task._id === updatedTask._id ? updatedTask : task
              )
            );
            setEditingTaskId(null);
          }}
        />
      )}
    </div>
  );
};

export default Ejercicio2;

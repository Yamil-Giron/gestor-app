import { useState } from "react";
import ProjectForm from "./components/projects/ProjectForm.jsx";
import ProjectList from "./components/projects/ProjectList.jsx";
import TaskForm from "./components/tasks/TaskForm.jsx";
import TaskList from "./components/tasks/TaskList.jsx";
import "./styles.css"; // asegúrate de tener este archivo

export default function App() {
  const [view, setView] = useState("projects");

  return (
    <div className="app-container">
      <h1 className="title">🚀 Gestor App</h1>

      <nav className="navbar">
        <button
          className={view === "projects" ? "active" : ""}
          onClick={() => setView("projects")}
        >
          📂 Proyectos
        </button>
        <button
          className={view === "tasks" ? "active" : ""}
          onClick={() => setView("tasks")}
        >
          ✅ Tareas
        </button>
      </nav>

      <main>
        {view === "projects" && (
          <>
            <ProjectForm />
            <ProjectList />
          </>
        )}

        {view === "tasks" && (
          <>
            <TaskForm />
            <TaskList />
          </>
        )}
      </main>
    </div>
  );
}

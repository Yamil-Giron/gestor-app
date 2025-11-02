import { useEffect, useState, Fragment } from "react";
import { db } from "../../firebase";
import {
  collection,
  onSnapshot,
  orderBy,
  query,
  doc,
  deleteDoc,
} from "firebase/firestore";

export default function TaskList() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const q = query(collection(db, "tasks"), orderBy("createdAt", "desc"));
    const unsub = onSnapshot(q, (snap) => {
      const items = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
      setTasks(items);
      setLoading(false);
    });
    return () => unsub();
  }, []);

  const remove = async (id) => {
    try {
      await deleteDoc(doc(db, "tasks", id));
    } catch (err) {
      alert("Error eliminando tarea");
    }
  };

  if (loading) return <p>Cargando...</p>;
  if (!tasks.length) return <p>No hay tareas pendientes</p>;

  return (
    <Fragment>
      <h2>Tareas</h2>
      <ul>
        {tasks.map((t) => (
          <li key={t.id} style={{ marginBottom: 8 }}>
            <strong>{t.name}</strong> — vence: {t.deadline}
            {t.suggestedPriority && (
              <span style={{ marginLeft: 8, fontSize: 12 }}>
                Prioridad sugerida: {t.suggestedPriority}
              </span>
            )}
            <button onClick={() => remove(t.id)} style={{ marginLeft: 8 }}>
              Eliminar
            </button>
          </li>
        ))}
      </ul>
    </Fragment>
  );
}

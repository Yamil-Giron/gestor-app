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

export default function ProjectList() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const q = query(collection(db, "projects"), orderBy("createdAt", "desc"));
    const unsub = onSnapshot(q, (snap) => {
      const items = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
      setProjects(items);
      setLoading(false);
    });
    return () => unsub();
  }, []);

  const remove = async (id) => {
    try {
      await deleteDoc(doc(db, "projects", id));
    } catch (err) {
      alert("Error eliminando proyecto");
    }
  };

  if (loading) return <p>Cargando...</p>;
  if (!projects.length) return <p>No hay proyectos</p>;

  return (
    <Fragment>
      <h2>Proyectos</h2>
      <ul>
        {projects.map((p) => (
          <li key={p.id} style={{ marginBottom: 8 }}>
            <strong>{p.name}</strong> — {p.description}
            {p.extra && (
              <div style={{ fontSize: 12, color: "#555" }}>
                Extra: #{p.extra.externalId} — {p.extra.externalTitle}
              </div>
            )}
            <button onClick={() => remove(p.id)} style={{ marginLeft: 8 }}>
              Eliminar
            </button>
          </li>
        ))}
      </ul>
    </Fragment>
  );
}

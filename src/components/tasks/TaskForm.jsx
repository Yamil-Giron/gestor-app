import { useRef, useState } from "react";
import axios from "axios";
import SimpleReactValidator from "simple-react-validator";
import { db } from "../../firebase";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";

export default function TaskForm({ onSaved }) {
  const validator = useRef(new SimpleReactValidator());
  const [form, setForm] = useState({ name: "", deadline: "" });
  const [saving, setSaving] = useState(false);
  const [, forceUpdate] = useState(0);

  const update = (k, v) => setForm((prev) => ({ ...prev, [k]: v }));
  const isValidDate = (value) => !isNaN(Date.parse(value));

  const submit = async (e) => {
    e.preventDefault();
    const v = validator.current;

    if (v.allValid() && isValidDate(form.deadline)) {
      try {
        setSaving(true);
        const { data } = await axios.get("https://jsonplaceholder.typicode.com/todos/1");
        const suggestedPriority = data.completed ? "baja" : "alta";

        await addDoc(collection(db, "tasks"), {
          name: form.name,
          deadline: form.deadline,
          suggestedPriority,
          createdAt: serverTimestamp(),
        });

        onSaved?.();
        setForm({ name: "", deadline: "" });
      } catch {
        alert("Error guardando la tarea");
      } finally {
        setSaving(false);
      }
    } else {
      v.showMessages();
      forceUpdate((n) => n + 1);
      if (!isValidDate(form.deadline)) alert("Fecha límite no es válida");
    }
  };

  return (
    <form onSubmit={submit} style={{ marginBottom: 16 }}>
      <div>
        <label>Nombre de la tarea</label>
        <input
          type="text"
          value={form.name}
          onChange={(e) => update("name", e.target.value)}
        />
        <div style={{ color: "crimson" }}>
          {validator.current.message("name", form.name, "required")}
        </div>
      </div>

      <div>
        <label>Fecha límite</label>
        <input
          type="date"
          value={form.deadline}
          onChange={(e) => update("deadline", e.target.value)}
        />
        <div style={{ color: "crimson" }}>
          {validator.current.message("deadline", form.deadline, "required")}
        </div>
      </div>

      <button type="submit" disabled={saving}>
        {saving ? "Guardando..." : "Agregar Tarea"}
      </button>
    </form>
  );
}

import { useRef, useState } from "react";
import axios from "axios";
import SimpleReactValidator from "simple-react-validator";
import { db } from "../../firebase";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";

export default function ProjectForm({ onSaved }) {
  const validator = useRef(new SimpleReactValidator());
  const [form, setForm] = useState({ name: "", description: "" });
  const [saving, setSaving] = useState(false);
  const [, forceUpdate] = useState(0);

  const update = (k, v) => setForm((prev) => ({ ...prev, [k]: v }));

  const submit = async (e) => {
    e.preventDefault();
    const v = validator.current;

    if (v.allValid()) {
      try {
        setSaving(true);
        const { data } = await axios.get("https://jsonplaceholder.typicode.com/posts/1");
        const extra = { externalId: data.id, externalTitle: data.title };

        await addDoc(collection(db, "projects"), {
          name: form.name,
          description: form.description,
          extra,
          createdAt: serverTimestamp(),
        });

        onSaved?.();
        setForm({ name: "", description: "" });
      } catch {
        alert("Error guardando el proyecto");
      } finally {
        setSaving(false);
      }
    } else {
      v.showMessages();
      forceUpdate((n) => n + 1);
    }
  };

  return (
    <form onSubmit={submit} style={{ marginBottom: 16 }}>
      <div>
        <label>Nombre del proyecto</label>
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
        <label>Descripción</label>
        <textarea
          value={form.description}
          onChange={(e) => update("description", e.target.value)}
        />
        <div style={{ color: "crimson" }}>
          {validator.current.message("description", form.description, "required|min:10")}
        </div>
      </div>

      <button type="submit" disabled={saving}>
        {saving ? "Guardando..." : "Guardar Proyecto"}
      </button>
    </form>
  );
}

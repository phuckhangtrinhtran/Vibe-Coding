import React, { useState, useEffect } from "react";

function ClassForm({ fetchClasses, editingClass, setEditingClass }) {

  const [form, setForm] = useState({
    class_id: "",
    class_name: "",
    advisor: ""
  });

  useEffect(() => {

    if (editingClass) {
      setForm(editingClass);
    }

  }, [editingClass]);

  const handleSubmit = async (e) => {

    e.preventDefault();

    if (editingClass) {

      await fetch(`http://127.0.0.1:8000/classes/${form.class_id}`, {
        method: "PUT",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(form)
      });

    } else {

      await fetch("http://127.0.0.1:8000/classes", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(form)
      });

    }

    fetchClasses();

    setForm({
      class_id: "",
      class_name: "",
      advisor: ""
    });

    setEditingClass(null);
  };

  return (
    <form onSubmit={handleSubmit}>

      <h2>{editingClass ? "Edit Class" : "Add Class"}</h2>

      <input
        placeholder="Class ID"
        value={form.class_id}
        disabled={editingClass}
        onChange={(e)=>setForm({...form,class_id:e.target.value})}
      />

      <input
        placeholder="Class Name"
        value={form.class_name}
        onChange={(e)=>setForm({...form,class_name:e.target.value})}
      />

      <input
        placeholder="Advisor"
        value={form.advisor}
        onChange={(e)=>setForm({...form,advisor:e.target.value})}
      />

      <button type="submit">
        {editingClass ? "Update Class" : "Add Class"}
      </button>

    </form>
  );
}

export default ClassForm;
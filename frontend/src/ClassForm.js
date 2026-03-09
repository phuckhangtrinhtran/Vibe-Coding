import React, { useState } from "react";

function ClassForm({ fetchClasses }) {

  const [form, setForm] = useState({
    class_id: "",
    class_name: "",
    advisor: ""
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    await fetch("http://127.0.0.1:8000/classes", {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(form)
    });

    fetchClasses();

    setForm({
      class_id: "",
      class_name: "",
      advisor: ""
    });
  };

  return (
    <form onSubmit={handleSubmit}>

      <h2>Add Class</h2>

      <input
        placeholder="Class ID"
        value={form.class_id}
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
        Add Class
      </button>

    </form>
  );
}

export default ClassForm;
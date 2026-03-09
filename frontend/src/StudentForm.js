import React, { useState, useEffect } from "react";

function StudentForm({ fetchStudents, editing, setEditing }) {

  const [form, setForm] = useState({
  student_id: "",
  name: "",
  birth_year: "",
  major: "",
  gpa: ""
});

  useEffect(() => {
    if (editing) {
      setForm(editing);
    }
  }, [editing]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (editing) {
      await fetch(`http://127.0.0.1:8000/students/${editing.student_id}`, {
        method: "PUT",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(form)
      });
      setEditing(null);
    } else {
      await fetch("http://127.0.0.1:8000/students", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(form)
      });
    }

    fetchStudents();

    setForm({student_id: "",name:"", birth_year:"", major:"", gpa:""});
  };

  return (
    <form onSubmit={handleSubmit}>

      <input placeholder="Student ID"
      value={form.student_id}
      onChange={(e)=>setForm({...form, student_id:e.target.value})}
/>
      <input placeholder="Name"
        value={form.name}
        onChange={(e)=>setForm({...form,name:e.target.value})}
      />

      <input placeholder="Birth Year"
        value={form.birth_year}
        onChange={(e)=>setForm({...form,birth_year:e.target.value})}
      />

      <input placeholder="Major"
        value={form.major}
        onChange={(e)=>setForm({...form,major:e.target.value})}
      />

      <input placeholder="GPA"
        value={form.gpa}
        onChange={(e)=>setForm({...form,gpa:e.target.value})}
      />

      <button type="submit">
        {editing ? "Update" : "Add"}
      </button>
    </form>
  );
}

export default StudentForm;
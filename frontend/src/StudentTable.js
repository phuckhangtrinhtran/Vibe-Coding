import React from "react";

function StudentTable({ students, fetchStudents, setEditing }) {

  const handleDelete = async (id) => {
    await fetch(`http://127.0.0.1:8000/students/${id}`, {
      method: "DELETE"
    });
    fetchStudents();
  };

  return (
    <table border="1">
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Birth Year</th>
          <th>Major</th>
          <th>GPA</th>
          <th>Actions</th>
        </tr>
      </thead>

      <tbody>
        {students.map(s => (
          <tr key={s.student_id}>
            <td>{s.student_id}</td>
            <td>{s.name}</td>
            <td>{s.birth_year}</td>
            <td>{s.major}</td>
            <td>{s.gpa}</td>
            <td>
              <button onClick={()=>setEditing(s)}>Edit</button>
              <button onClick={()=>handleDelete(s.student_id)}>Delete</button>
            </td>
          </tr>
        ))}
      </tbody>

    </table>
  );
}

export default StudentTable;
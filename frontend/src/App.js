import React, { useEffect, useState } from "react";
import StudentForm from "./StudentForm";
import StudentTable from "./StudentTable";

function App() {

  const [students, setStudents] = useState([]);
  const [editing, setEditing] = useState(null);

  const fetchStudents = async () => {
    const res = await fetch("http://127.0.0.1:8000/students");
    const data = await res.json();
    setStudents(data);
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  return (
    <div>
      <h1>Student Management</h1>

      <StudentForm
        fetchStudents={fetchStudents}
        editing={editing}
        setEditing={setEditing}
      />

      <StudentTable
        students={students}
        fetchStudents={fetchStudents}
        setEditing={setEditing}
      />

    </div>
  );
}

export default App;
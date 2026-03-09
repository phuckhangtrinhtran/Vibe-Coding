import React, { useEffect, useState } from "react";
import "./App.css";
import StudentForm from "./StudentForm";
import StudentTable from "./StudentTable";

function App() {

  const [students, setStudents] = useState([]);
  const [editing, setEditing] = useState(null);

  const fetchStudents = async () => {
  try {
    const res = await fetch("http://127.0.0.1:8000/students");

    if (!res.ok) {
      throw new Error("Failed to fetch students");
    }

    const data = await res.json();
    setStudents(data);
  } catch (error) {
    console.error("Error loading students:", error);
  }
};

  useEffect(() => {
    fetchStudents();
  }, []);

  return (
    <div className="App">
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
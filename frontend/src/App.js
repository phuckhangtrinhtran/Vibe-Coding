import React, { useEffect, useState } from "react";
import "./App.css";
import StudentForm from "./StudentForm";
import StudentTable from "./StudentTable";

function App() {

  const [students, setStudents] = useState([]);
  const [editing, setEditing] = useState(null);
  const [searchName, setSearchName] = useState("");

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

  const searchStudents = async () => {

    if (searchName === "") {
      fetchStudents();
      return;
    }

    const res = await fetch(
      `http://127.0.0.1:8000/students/search?name=${searchName}`
    );

    const data = await res.json();
    setStudents(data);
  };

  const exportCSV = () => {
    window.open("http://127.0.0.1:8000/export/csv");
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  return (
    <div className="App">

      <h1>Student Management</h1>

      <div style={{ marginBottom: "20px" }}>

        <input
          placeholder="Search student name"
          value={searchName}
          onChange={(e) => setSearchName(e.target.value)}
        />

        <button onClick={searchStudents}>
          Search
        </button>

        <button onClick={exportCSV}>
          Export CSV
        </button>

      </div>

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
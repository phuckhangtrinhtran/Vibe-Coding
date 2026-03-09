import React, { useEffect, useState } from "react";
import "./App.css";
import StudentForm from "./StudentForm";
import StudentTable from "./StudentTable";
import ClassForm from "./ClassForm";
import ClassTable from "./ClassTable";

function App() {

  const [students, setStudents] = useState([]);
  const [classes, setClasses] = useState([]);
  const [editing, setEditing] = useState(null);
  const [searchName, setSearchName] = useState("");

  // =================
  // STUDENTS
  // =================

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

  // =================
  // CLASSES
  // =================

  const fetchClasses = async () => {

    try {

      const res = await fetch("http://127.0.0.1:8000/classes");

      if (!res.ok) {
        throw new Error("Failed to fetch classes");
      }

      const data = await res.json();
      setClasses(data);

    } catch (error) {
      console.error("Error loading classes:", error);
    }
  };

  // =================
  // LOAD DATA
  // =================

  useEffect(() => {
    fetchStudents();
    fetchClasses();
  }, []);

  return (
    <div className="App">

      <h1>Student Management</h1>

      {/* SEARCH + EXPORT */}

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

      {/* CLASS MANAGEMENT */}

      <ClassForm fetchClasses={fetchClasses} />

      <ClassTable classes={classes} />

      <hr style={{ margin: "40px 0" }} />

      {/* STUDENT MANAGEMENT */}

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
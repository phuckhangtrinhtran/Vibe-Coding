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
  const [editingClass, setEditingClass] = useState(null);

  const [statistics, setStatistics] = useState({
    total_students: 0,
    average_gpa: 0,
    students_by_major: []
  });

  const [showDashboard, setShowDashboard] = useState(false);

  // =================
  // STUDENTS
  // =================

  const fetchStudents = async () => {

    const res = await fetch("http://127.0.0.1:8000/students");
    const data = await res.json();

    setStudents(data);
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

  // =================
  // EXPORT CSV
  // =================

  const exportStudentsCSV = () => {
    window.open("http://127.0.0.1:8000/export/csv");
  };

  const exportClassesCSV = () => {
    window.open("http://127.0.0.1:8000/export/classes");
  };

  // =================
  // CLASSES
  // =================

  const fetchClasses = async () => {

    const res = await fetch("http://127.0.0.1:8000/classes");
    const data = await res.json();

    setClasses(data);
  };


  // =================
  // STATISTICS
  // =================

  const fetchStatistics = async () => {

    const res = await fetch("http://127.0.0.1:8000/statistics");
    const data = await res.json();

    setStatistics(data);
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

      {/* EXPORT + DASHBOARD */}

      <div style={{ marginBottom: "20px" }}>

        <button onClick={exportStudentsCSV}>
          Export Students CSV
        </button>

        <button onClick={exportClassesCSV}>
          Export Classes CSV
        </button>

        <button onClick={() => {
          fetchStatistics();
          setShowDashboard(true);
        }}>
          Show Dashboard
        </button>

      </div>

      {/* DASHBOARD */}

      {showDashboard && (

      <div style={{ marginBottom: "30px" }}>

        <h2>Statistics</h2>

        <p>Total Students: {statistics.total_students}</p>

        <p>
          Average GPA: {statistics.average_gpa
            ? statistics.average_gpa.toFixed(2)
            : 0}
        </p>

        <h3>Students by Major</h3>

        <ul>
          {statistics.students_by_major.map((m, index) => (
            <li key={index}>
              {m.major} : {m.count}
            </li>
          ))}
        </ul>

      </div>

      )}

      {/* CLASS MANAGEMENT */}

      <ClassForm
        fetchClasses={fetchClasses}
        editingClass={editingClass}
        setEditingClass={setEditingClass}
      />

      <ClassTable
        classes={classes}
        fetchClasses={fetchClasses}
        setEditingClass={setEditingClass}
      />

      {/* STUDENT MANAGEMENT */}

      <h2>Student List</h2>

      {/* SEARCH */}

      <div style={{ marginBottom: "20px" }}>

        <input
          placeholder="Search student name"
          value={searchName}
          onChange={(e) => setSearchName(e.target.value)}
        />

        <button onClick={searchStudents}>
          Search
        </button>

        <button onClick={() => {
          setSearchName("");
          fetchStudents();
        }}>
          Reset
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
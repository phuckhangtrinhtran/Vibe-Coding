import React from "react";

function ClassTable({ classes, fetchClasses, setEditingClass }) {

  return (
    <div>

      <h2>Class List</h2>

      <table border="1">

        <thead>
          <tr>
            <th>Class ID</th>
            <th>Class Name</th>
            <th>Advisor</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>

          {classes.length === 0 ? (
            <tr>
              <td colSpan="4">No classes</td>
            </tr>
          ) : (

            classes.map((c) => (
              <tr key={c.class_id}>
                <td>{c.class_id}</td>
                <td>{c.class_name}</td>
                <td>{c.advisor}</td>

                <td>

                  <button
                    onClick={() => setEditingClass(c)}
                  >
                    Edit
                  </button>

                </td>

              </tr>
            ))

          )}

        </tbody>

      </table>

    </div>
  );
}

export default ClassTable;
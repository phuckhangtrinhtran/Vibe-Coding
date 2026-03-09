import React from "react";

function ClassTable({ classes }) {

  return (
    <div>

      <h2>Class List</h2>

      <table border="1">

        <thead>
          <tr>
            <th>Class ID</th>
            <th>Class Name</th>
            <th>Advisor</th>
          </tr>
        </thead>

        <tbody>

          {classes.length === 0 ? (
            <tr>
              <td colSpan="3">No classes</td>
            </tr>
          ) : (

            classes.map((c) => (
              <tr key={c.class_id}>
                <td>{c.class_id}</td>
                <td>{c.class_name}</td>
                <td>{c.advisor}</td>
              </tr>
            ))

          )}

        </tbody>

      </table>

    </div>
  );
}

export default ClassTable;
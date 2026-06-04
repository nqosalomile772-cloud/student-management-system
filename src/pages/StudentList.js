import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function StudentList({ students, deleteStudent }) {
  const [searchTerm, setSearchTerm] = useState('');

  // Filter students based on search
  const filteredStudents = students.filter(student =>
    student.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="card">
      <h2>📋 Student Records</h2>
      <p>Total Students: {students.length}</p>
      
      <div className="search-bar">
        <input
          type="text"
          placeholder="🔍 Search by Student ID or Name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {filteredStudents.length === 0 ? (
        <p style={{ textAlign: 'center', padding: '2rem' }}>No students found</p>
      ) : (
        <table className="student-table">
          <thead>
            <tr>
              <th>Student ID</th>
              <th>Student Name</th>
              <th>Programme</th>
              <th>Year of Study</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredStudents.map((student) => (
              <tr key={student.id}>
                <td>{student.id}</td>
                <td>{student.name}</td>
                <td>{student.programme}</td>
                <td>{student.year}</td>
                <td>
                  <Link to={`/update/${student.id}`}>
                    <button className="btn btn-warning">✏️ Edit</button>
                  </Link>
                  <button 
                    className="btn btn-danger" 
                    onClick={() => deleteStudent(student.id)}
                  >
                    🗑️ Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default StudentList;
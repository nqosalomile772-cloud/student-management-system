import React from 'react';

function About() {
  return (
    <div className="card">
      <h2>ℹ️ About This System</h2>
      <div style={{ marginTop: '2rem' }}>
        <h3>Purpose of the System</h3>
        <p style={{ marginTop: '0.5rem', lineHeight: '1.6' }}>
          This Student Management System is designed to help Limkokwing University 
          administrators efficiently manage student records. The system provides 
          a user-friendly interface for performing CRUD operations (Create, Read, 
          Update, Delete) on student data.
        </p>

        <h3 style={{ marginTop: '2rem' }}>Developer Information</h3>
        <p style={{ marginTop: '0.5rem' }}>
          <strong>Developer:</strong> [Catherine Nqosa]<br />
          <strong>University:</strong> Limkokwing University<br />
          <strong>Course:</strong> Web Development<br />
          <strong>Assignment:</strong> Student Management System
        </p>

        <h3 style={{ marginTop: '2rem' }}>Version Information</h3>
        <p style={{ marginTop: '0.5rem' }}>
          <strong>Version:</strong> 1.0.0<br />
          <strong>Release Date:</strong> {new Date().toLocaleDateString()}<br />
          <strong>Status:</strong> Production Ready
        </p>

        <h3 style={{ marginTop: '2rem' }}>Technologies Used</h3>
        <ul style={{ marginTop: '0.5rem', lineHeight: '1.8' }}>
          <li>React 18 - Frontend Framework</li>
          <li>React Router DOM - Navigation</li>
          <li>LocalStorage - Data Persistence</li>
          <li>CSS3 - Styling</li>
        </ul>
      </div>
    </div>
  );
}

export default About;
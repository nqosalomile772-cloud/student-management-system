import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';  // ADD THIS LINE
import Login from './pages/Login';
import Welcome from './pages/Welcome';
import StudentList from './pages/StudentList';
import AddStudent from './pages/AddStudent';
import UpdateStudent from './pages/UpdateStudent';
import About from './pages/About';
import './App.css';

function App() {
  const [students, setStudents] = useState([]);
  const [loggedInUser, setLoggedInUser] = useState(null);

  // Check if user is already logged in
  useEffect(() => {
    const savedUser = localStorage.getItem('loggedInUser');
    if (savedUser) {
      setLoggedInUser(JSON.parse(savedUser));
    }
  }, []);

  // Load students from localStorage when app starts
  useEffect(() => {
    const savedStudents = localStorage.getItem('students');
    if (savedStudents) {
      setStudents(JSON.parse(savedStudents));
    } else {
      // Add some sample data
      const sampleStudents = [
        { id: 'S001', name: 'John Doe', programme: 'Computer Science', year: '2024' },
        { id: 'S002', name: 'Jane Smith', programme: 'Business', year: '2023' },
        { id: 'S003', name: 'Mike Johnson', programme: 'Engineering', year: '2024' }
      ];
      setStudents(sampleStudents);
      localStorage.setItem('students', JSON.stringify(sampleStudents));
    }
  }, []);

  // Save students whenever they change
  useEffect(() => {
    if (students.length > 0) {
      localStorage.setItem('students', JSON.stringify(students));
    }
  }, [students]);

  // CRUD Operations
  const addStudent = (newStudent) => {
    setStudents([...students, newStudent]);
  };

  const updateStudent = (updatedStudent) => {
    setStudents(students.map(student => 
      student.id === updatedStudent.id ? updatedStudent : student
    ));
  };

  const deleteStudent = (studentId) => {
    if (window.confirm('Are you sure you want to delete this student?')) {
      setStudents(students.filter(student => student.id !== studentId));
    }
  };

  // Protected Route component
  const ProtectedRoute = ({ children }) => {
    if (!loggedInUser) {
      return <Navigate to="/login" replace />;
    }
    return children;
  };

  return (
    <Router>
      <div className="app">
        <Navbar loggedInUser={loggedInUser} setLoggedInUser={setLoggedInUser} />
        
        <div className="container">
          <Routes>
            <Route path="/login" element={<Login setLoggedInUser={setLoggedInUser} />} />
            
            <Route path="/welcome" element={
              <ProtectedRoute>
                <Welcome loggedInUser={loggedInUser} />
              </ProtectedRoute>
            } />
            
            <Route path="/students" element={
              <ProtectedRoute>
                <StudentList 
                  students={students} 
                  deleteStudent={deleteStudent}
                />
              </ProtectedRoute>
            } />
            
            <Route path="/add" element={
              <ProtectedRoute>
                <AddStudent addStudent={addStudent} />
              </ProtectedRoute>
            } />
            
            <Route path="/update/:id" element={
              <ProtectedRoute>
                <UpdateStudent 
                  students={students} 
                  updateStudent={updateStudent}
                />
              </ProtectedRoute>
            } />
            
            <Route path="/about" element={
              <ProtectedRoute>
                <About />
              </ProtectedRoute>
            } />
            
            <Route path="/" element={<Navigate to="/login" replace />} />
          </Routes>
        </div>
        
        <Footer /> {/* ADD THIS LINE */}
      </div>
    </Router>
  );
}

export default App;
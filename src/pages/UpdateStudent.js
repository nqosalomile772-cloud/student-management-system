import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

function UpdateStudent({ students, updateStudent }) {
  const navigate = useNavigate();
  const { id } = useParams();
  const [formData, setFormData] = useState({
    id: '',
    name: '',
    programme: '',
    year: ''
  });

  const programmes = [
    'Computer Science',
    'Business Administration',
    'Engineering',
    'Information Technology',
    'Graphic Design',
    'Accounting'
  ];

  const years = ['2021', '2022', '2023', '2024', '2025'];

  useEffect(() => {
    const student = students.find(s => s.id === id);
    if (student) {
      setFormData(student);
    } else {
      navigate('/students');
    }
  }, [id, students, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    updateStudent(formData);
    alert('Student updated successfully!');
    navigate('/students');
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="card">
      <h2>✏️ Update Student Information</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Student ID:</label>
          <input
            type="text"
            name="id"
            value={formData.id}
            disabled
            style={{ backgroundColor: '#f0f0f0' }}
          />
          <small>Student ID cannot be changed</small>
        </div>

        <div className="form-group">
          <label>Student Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Programme:</label>
          <select
            name="programme"
            value={formData.programme}
            onChange={handleChange}
            required
          >
            <option value="">Select Programme</option>
            {programmes.map(prog => (
              <option key={prog} value={prog}>{prog}</option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label>Year of Study:</label>
          <select
            name="year"
            value={formData.year}
            onChange={handleChange}
            required
          >
            <option value="">Select Year</option>
            {years.map(year => (
              <option key={year} value={year}>{year}</option>
            ))}
          </select>
        </div>

        <button type="submit" className="btn btn-primary">
          💾 Save Changes
        </button>
        <button 
          type="button" 
          className="btn" 
          onClick={() => navigate('/students')}
          style={{ marginLeft: '1rem' }}
        >
          Cancel
        </button>
      </form>
    </div>
  );
}

export default UpdateStudent;
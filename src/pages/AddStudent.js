import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function AddStudent({ addStudent }) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    id: '',
    name: '',
    programme: '',
    year: ''
  });

  const [errors, setErrors] = useState({});

  const programmes = [
    'Computer Science',
    'Business Administration',
    'Engineering',
    'Information Technology',
    'Graphic Design',
    'Accounting'
  ];

  const years = ['2021', '2022', '2023', '2024', '2025'];

  const validateForm = () => {
    let newErrors = {};
    if (!formData.id) newErrors.id = 'Student ID is required';
    if (!formData.name) newErrors.name = 'Student name is required';
    if (!formData.programme) newErrors.programme = 'Programme is required';
    if (!formData.year) newErrors.year = 'Year of study is required';
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = validateForm();
    if (Object.keys(newErrors).length === 0) {
      addStudent(formData);
      alert('Student added successfully!');
      navigate('/students');
    } else {
      setErrors(newErrors);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="card">
      <h2>➕ Add New Student</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Student ID:</label>
          <input
            type="text"
            name="id"
            value={formData.id}
            onChange={handleChange}
            placeholder="e.g., S001"
          />
          {errors.id && <small style={{ color: 'red' }}>{errors.id}</small>}
        </div>

        <div className="form-group">
          <label>Student Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Full name"
          />
          {errors.name && <small style={{ color: 'red' }}>{errors.name}</small>}
        </div>

        <div className="form-group">
          <label>Programme:</label>
          <select
            name="programme"
            value={formData.programme}
            onChange={handleChange}
          >
            <option value="">Select Programme</option>
            {programmes.map(prog => (
              <option key={prog} value={prog}>{prog}</option>
            ))}
          </select>
          {errors.programme && <small style={{ color: 'red' }}>{errors.programme}</small>}
        </div>

        <div className="form-group">
          <label>Year of Study:</label>
          <select
            name="year"
            value={formData.year}
            onChange={handleChange}
          >
            <option value="">Select Year</option>
            {years.map(year => (
              <option key={year} value={year}>{year}</option>
            ))}
          </select>
          {errors.year && <small style={{ color: 'red' }}>{errors.year}</small>}
        </div>

        <button type="submit" className="btn btn-success">
          ✅ Add Student
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

export default AddStudent;
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login({ setLoggedInUser }) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [loginAttempts, setLoginAttempts] = useState(0);
  const [isLocked, setIsLocked] = useState(false);
  const [lockoutTime, setLockoutTime] = useState(null);

  // Hardcoded users with more details
  const validUsers = [
    { 
      username: 'admin', 
      password: 'Admin@2024', 
      role: 'System Administrator',
      email: 'admin@limkokwing.edu',
      lastLogin: null
    },
    { 
      username: 'staff', 
      password: 'Staff@2024', 
      role: 'Academic Staff',
      email: 'staff@limkokwing.edu',
      lastLogin: null
    },
    { 
      username: 'limkokwing', 
      password: 'University@2024', 
      role: 'University Admin',
      email: 'admin@limkokwing.edu.my',
      lastLogin: null
    },
    { 
      username: 'professor', 
      password: 'Prof@2024', 
      role: 'Professor',
      email: 'professor@limkokwing.edu',
      lastLogin: null
    }
  ];

  const validateForm = () => {
    let newErrors = {};
    
    // Username validations
    if (!formData.username.trim()) {
      newErrors.username = 'Username is required';
    } else if (formData.username.length < 3) {
      newErrors.username = 'Username must be at least 3 characters';
    } else if (!/^[a-zA-Z0-9_]+$/.test(formData.username)) {
      newErrors.username = 'Username can only contain letters, numbers, and underscore';
    }
    
    // Password validations
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    } else {
      // Strong password validation
      const hasUpperCase = /[A-Z]/.test(formData.password);
      const hasLowerCase = /[a-z]/.test(formData.password);
      const hasNumbers = /\d/.test(formData.password);
      const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(formData.password);
      
      if (!hasUpperCase) {
        newErrors.password = 'Password must contain at least one uppercase letter';
      } else if (!hasLowerCase) {
        newErrors.password = 'Password must contain at least one lowercase letter';
      } else if (!hasNumbers) {
        newErrors.password = 'Password must contain at least one number';
      } else if (!hasSpecialChar) {
        newErrors.password = 'Password must contain at least one special character (!@#$%^&*)';
      }
    }
    
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Check if account is locked
    if (isLocked && lockoutTime) {
      const now = new Date();
      const lockoutDuration = 5 * 60 * 1000; // 5 minutes
      if (now - lockoutTime < lockoutDuration) {
        const remainingMinutes = Math.ceil((lockoutDuration - (now - lockoutTime)) / 60000);
        setErrors({ 
          login: `Account locked. Please try again in ${remainingMinutes} minute(s). Too many failed attempts.` 
        });
        return;
      } else {
        // Reset lockout after duration
        setIsLocked(false);
        setLoginAttempts(0);
      }
    }
    
    const newErrors = validateForm();
    
    if (Object.keys(newErrors).length === 0) {
      // Check if user exists
      const user = validUsers.find(
        u => u.username === formData.username && u.password === formData.password
      );
      
      if (user) {
        // Successful login - reset attempts
        setLoginAttempts(0);
        setIsLocked(false);
        
        // Update last login time
        user.lastLogin = new Date().toLocaleString();
        
        const loggedInUser = {
          username: user.username,
          role: user.role,
          email: user.email,
          loginTime: new Date().toLocaleString(),
          lastLogin: user.lastLogin
        };
        
        setLoggedInUser(loggedInUser);
        localStorage.setItem('loggedInUser', JSON.stringify(loggedInUser));
        
        // Show success message
        alert(`✅ Welcome back, ${user.username}!\nRole: ${user.role}\nTime: ${loggedInUser.loginTime}`);
        navigate('/welcome');
      } else {
        // Failed login attempt
        const newAttempts = loginAttempts + 1;
        setLoginAttempts(newAttempts);
        
        if (newAttempts >= 3) {
          setIsLocked(true);
          setLockoutTime(new Date());
          setErrors({ login: 'Account locked due to 3 failed attempts. Please wait 5 minutes.' });
        } else {
          setErrors({ login: `Invalid username or password. ${3 - newAttempts} attempt(s) remaining.` });
        }
      }
    } else {
      setErrors(newErrors);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    // Clear error when user starts typing
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: '' });
    }
    if (errors.login) {
      setErrors({ ...errors, login: '' });
    }
  };

  const handleForgotPassword = () => {
    alert('📧 Password reset feature coming soon!\n\nPlease contact your system administrator for password assistance.');
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-header">
          <div className="login-icon">🔐</div>
          <h2>Student Management System</h2>
          <p>Secure Access Portal</p>
          <div className="security-badge">🔒 SSL Secured</div>
        </div>
        
        {errors.login && (
          <div className="error-message">
            ❌ {errors.login}
          </div>
        )}
        
        {loginAttempts > 0 && loginAttempts < 3 && (
          <div className="warning-message">
            ⚠️ {3 - loginAttempts} login attempt(s) remaining
          </div>
        )}
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>👤 Username</label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="Enter your username"
              className={errors.username ? 'error-input' : ''}
              autoComplete="off"
            />
            {errors.username && <small className="error-text">{errors.username}</small>}
          </div>

          <div className="form-group">
            <label>🔒 Password</label>
            <div className="password-input-wrapper">
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your password"
                className={errors.password ? 'error-input' : ''}
              />
              <button
                type="button"
                className="toggle-password"
                onClick={() => setShowPassword(!showPassword)}
                title={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? '👁️' : '👁️‍🗨️'}
              </button>
            </div>
            {errors.password && <small className="error-text">{errors.password}</small>}
          </div>

          <div className="form-group">
            <label className="checkbox-label">
              <input type="checkbox" /> Remember me
            </label>
          </div>

          <button type="submit" className="btn-login">
            Login → 
          </button>
          
          <div className="forgot-password">
            <button 
              type="button"
              onClick={handleForgotPassword}
              className="forgot-password-btn"
            >
              Forgot Password?
            </button>
          </div>

          <div className="login-info">
            <p><strong>📋 Demo Credentials:</strong></p>
            <ul>
              <li><strong>Admin:</strong> admin / Admin@2024</li>
              <li><strong>Staff:</strong> staff / Staff@2024</li>
              <li><strong>University Admin:</strong> limkokwing / University@2024</li>
              <li><strong>Professor:</strong> professor / Prof@2024</li>
            </ul>
            <p className="password-requirements">
              🔒 Password must contain: uppercase, lowercase, number & special character
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
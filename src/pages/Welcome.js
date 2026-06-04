import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Welcome({ loggedInUser }) {
  const navigate = useNavigate();
  const [currentTime, setCurrentTime] = useState(new Date());
  const [systemStats, setSystemStats] = useState({
    totalStudents: 0,
    activeSessions: 1,
    lastBackup: 'Today, 10:00 AM'
  });

  useEffect(() => {
    // Update time every second
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    
    // Get total students from localStorage
    const students = JSON.parse(localStorage.getItem('students') || '[]');
    setSystemStats(prev => ({
      ...prev,
      totalStudents: students.length
    }));
    
    return () => clearInterval(timer);
  }, []);

  const handleLogout = () => {
    if (window.confirm('Are you sure you want to logout?')) {
      localStorage.removeItem('loggedInUser');
      navigate('/login');
    }
  };

  const formatDate = (date) => {
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatTime = (date) => {
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  };

  return (
    <div className="welcome-page">
      <div className="welcome-header">
        <h1>🎉 Welcome to Student Management System</h1>
        <p>Limkokwing University of Creative Technology</p>
        <div className="datetime-display">
          <div className="date">{formatDate(currentTime)}</div>
          <div className="time">{formatTime(currentTime)}</div>
        </div>
      </div>

      <div className="welcome-content">
        <div className="user-info-card">
          <div className="user-avatar">
            {loggedInUser?.username?.charAt(0).toUpperCase()}
          </div>
          <h3>Welcome, {loggedInUser?.username}!</h3>
          <p><strong>Role:</strong> <span className="role-badge">{loggedInUser?.role}</span></p>
          <p><strong>Email:</strong> {loggedInUser?.email}</p>
          <p><strong>Login Time:</strong> {loggedInUser?.loginTime}</p>
          <p><strong>Last Login:</strong> {loggedInUser?.lastLogin || 'First time login'}</p>
          <div className="user-actions">
            <button onClick={handleLogout} className="btn-logout">
              🚪 Logout
            </button>
            <button onClick={() => navigate('/students')} className="btn-primary">
              📊 Go to Dashboard
            </button>
          </div>
        </div>

        <div className="stats-dashboard">
          <div className="stat-card">
            <div className="stat-icon">👨‍🎓</div>
            <div className="stat-info">
              <h3>{systemStats.totalStudents}</h3>
              <p>Total Students</p>
            </div>
          </div>
          
          <div className="stat-card">
            <div className="stat-icon">🟢</div>
            <div className="stat-info">
              <h3>{systemStats.activeSessions}</h3>
              <p>Active Sessions</p>
            </div>
          </div>
          
          <div className="stat-card">
            <div className="stat-icon">💾</div>
            <div className="stat-info">
              <h3>Auto</h3>
              <p>Auto-Save Active</p>
            </div>
          </div>
          
          <div className="stat-card">
            <div className="stat-icon">🔄</div>
            <div className="stat-info">
              <h3>{systemStats.lastBackup}</h3>
              <p>Last Backup</p>
            </div>
          </div>
        </div>

        <div className="system-info">
          <div className="info-card">
            <div className="info-icon">📊</div>
            <h3>System Overview</h3>
            <p>Efficiently manage all student records, track academic progress, and maintain organized data with our comprehensive management system.</p>
            <div className="progress-bar">
              <div className="progress-fill" style={{width: '75%'}}></div>
            </div>
            <p className="progress-text">System Capacity: 75%</p>
          </div>

          <div className="info-card">
            <div className="info-icon">🎯</div>
            <h3>Key Features</h3>
            <ul>
              <li>✓ Student Registration</li>
              <li>✓ Record Management</li>
              <li>✓ Search & Filter</li>
              <li>✓ Data Analytics</li>
              <li>✓ Real-time Updates</li>
              <li>✓ Secure Access</li>
            </ul>
          </div>

          <div className="info-card">
            <div className="info-icon">🚀</div>
            <h3>Quick Actions</h3>
            <div className="quick-actions">
              <button onClick={() => navigate('/students')} className="action-btn">
                View All Students
              </button>
              <button onClick={() => navigate('/add')} className="action-btn">
                Add New Student
              </button>
              <button onClick={() => window.print()} className="action-btn">
                Print Report
              </button>
            </div>
          </div>
        </div>

        <div className="announcement">
          <h3>📢 Announcement</h3>
          <p>Welcome to the new semester! Please ensure all student records are updated by the end of this week.</p>
          <div className="announcement-footer">
            <span>Posted: {formatDate(new Date())}</span>
            <button className="read-more">Read More →</button>
          </div>
        </div>

        <div className="tips-section">
          <h3>💡 Quick Tips</h3>
          <ul>
            <li>Use the search bar to quickly find students by ID or name</li>
            <li>Click on Edit to modify student information</li>
            <li>All changes are automatically saved to your browser</li>
            <li>Export data feature coming soon!</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Welcome;
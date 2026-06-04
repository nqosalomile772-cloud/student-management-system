import React from 'react';

function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <h3>📚 Student Management System</h3>
          <p>Limkokwing University's official student management platform</p>
          <div className="social-links">
            <a href="#" className="social-link">📘 Facebook</a>
            <a href="#" className="social-link">🐦 Twitter</a>
            <a href="#" className="social-link">📧 Email</a>
          </div>
        </div>
        
        <div className="footer-section">
          <h4>Quick Links</h4>
          <ul>
            <li><a href="/welcome">Home</a></li>
            <li><a href="/students">Student Records</a></li>
            <li><a href="/add">Add Student</a></li>
            <li><a href="/about">About Us</a></li>
          </ul>
        </div>
        
        <div className="footer-section">
          <h4>Contact Info</h4>
          <ul>
            <li>📍 Limkokwing University</li>
            <li>📞 +123 456 7890</li>
            <li>✉️ support@limkokwing.edu</li>
            <li>🕒 Mon-Fri: 9AM - 5PM</li>
          </ul>
        </div>
        
        <div className="footer-section">
          <h4>System Status</h4>
          <ul>
            <li>🟢 Version: 2.0.0</li>
            <li>✅ All Systems Operational</li>
            <li>🔒 Secure Connection</li>
            <li>📊 Active Sessions</li>
          </ul>
        </div>
      </div>
      
      <div className="footer-bottom">
        <p>&copy; {currentYear} Limkokwing University. All rights reserved.</p>
        <p>Developed for Student Management System Assignment</p>
      </div>
    </footer>
  );
}

export default Footer;
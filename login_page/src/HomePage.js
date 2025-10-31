import React, { useState } from 'react';
import './HomePage.css';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

function HomePage({ user, onSignOut }) {
  const [activePage, setActivePage] = useState('dashboard');
  const [selectedType, setSelectedType] = useState(null);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState(null);


  const renderContent = () => {
    switch (activePage) {
      case 'dashboard':
        return (
          <>
            {/* Dashboard */}
            <section className="welcome-section">
              <h2>Your Health Dashboard</h2>
              <p>Manage your healthcare journey in one place</p>
            </section>

            {/* Quick Stats */}
            <section className="stats-section">
              <div className="stat-card">
                <div className="stat-icon">👨‍⚕️</div>
                <div>
                  <h3>Your Doctors</h3>
                  <p className="stat-value">3</p>
                  <span>Active physicians</span>
                </div>
              </div>

              <div className="stat-card">
                <div className="stat-icon">📅</div>
                <div>
                  <h3>Next Appointment</h3>
                  <p className="stat-value">Tomorrow</p>
                  <span>10:00 AM</span>
                </div>
              </div>

              <div className="stat-card">
                <div className="stat-icon">💊</div>
                <div>
                  <h3>Medications</h3>
                  <p className="stat-value">2</p>
                  <span>Active prescriptions</span>
                </div>
              </div>
            </section>

            {/* Quick Actions */}
            <section className="actions-section">
              <h3>Quick Access</h3>
              <div className="actions-grid">
                <div className="action-card">
                  <div className="action-icon">👨‍⚕️</div>
                  <h4>Find Doctors</h4>
                  <p>Browse and connect with healthcare specialists.</p>
                  <button className="primary-btn" onClick={() => setActivePage('doctors')}>
                    View Doctors
                  </button>
                </div>
                <div className="action-card">
                  <div className="action-icon">📅</div>
                  <h4>Book Appointment</h4>
                  <p>Schedule your next medical consultation easily.</p>
                  <button className="primary-btn" onClick={() => setActivePage('appointments')}>
                    Schedule Now
                  </button>
                </div>
                <div className="action-card">
                  <div className="action-icon">ℹ️</div>
                  <h4>About Us</h4>
                  <p>Learn about our healthcare services and mission.</p>
                  <button className="primary-btn" onClick={() => setActivePage('about')}>
                    Learn More
                  </button>
                </div>
              </div>
            </section>
          </>
        );

      case 'doctors':
        return (
          <section className="doctors-section">
            <h3>Our Doctors</h3>
            <p style={{ textAlign: 'center', color: '#3498db', marginBottom: '30px' }}>
              Meet our team of experienced healthcare professionals.
            </p>

            <div className="doctors-grid">
              <div className="doctor-card">
                <img
                  src="/image1.png"
                  alt="Dr. Sarah Johnson"
                  className="doctor-avatar"
                />
                <h4>Dr. Ahmed Ibrahim Shanab</h4>
                <p>Cardiologist</p>
                <button className="secondary-btn">View Profile</button>
              </div>

              <div className="doctor-card">
                <img
                  src="/image2.png"
                  alt="Dr. Ahmed Ali"
                  className="doctor-avatar"
                />
                <h4>Dr. Moaz Mohamed</h4>
                <p>Neurologist</p>
                <button className="secondary-btn">View Profile</button>
              </div>

              <div className="doctor-card">
                <img
                  src="/image3.png"
                  alt="Dr. Emily Carter"
                  className="doctor-avatar"
                />
                <h4>Dr. Ahmed Makram</h4>
                <p>Dermatologist</p>
                <button className="secondary-btn">View Profile</button>
              </div>

              <div className="doctor-card">
                <img
                  src="/image4.png"
                  alt="Dr. Omar Hassan"
                  className="doctor-avatar"
                />
                <h4>Dr. Ahmed ElKady</h4>
                <p>Pediatrician</p>
                <button className="secondary-btn">View Profile</button>
              </div>
            </div>

            <div style={{ textAlign: 'center', marginTop: '40px' }}>
              <button className="back-btn" onClick={() => setActivePage('dashboard')}>
                ⬅ Back
              </button>
            </div>
          </section>
        );

      case 'appointments':
        return (
          <section className="appointments-booking-section">
            <h2>Book an Appointment</h2>

            {/* Appointment Type Selection */}
            <div className="appointment-type-container">
              <h3>Select appointment type</h3>
              <div className="appointment-types">
                {[
                  { id: 1, name: 'General Consultation', duration: '30 mins' },
                  { id: 2, name: 'Follow-up Check', duration: '15 mins' },
                  { id: 3, name: 'Specialist Visit', duration: '1 hour' },
                  { id: 4, name: 'Medical Test', duration: '45 mins' },
                ].map((type) => (
                  <div
                    key={type.id}
                    className={`appointment-type ${
                      selectedType === type.id ? 'selected' : ''
                    }`}
                    onClick={() => setSelectedType(type.id)}
                  >
                    <h4>{type.name}</h4>
                    <p>{type.duration}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Calendar Picker */}
            <div className="calendar-container">
              <h3>Select date</h3>
              <Calendar
                onChange={setSelectedDate}
                value={selectedDate}
                minDate={new Date()}
              />
            </div>

            {/* Time Slot Picker */}
            <div className="time-slot-container">
              <h3>Select time</h3>
              <div className="time-slots">
                {[
                  '9:00 AM', '9:30 AM', '10:00 AM',
                  '10:30 AM', '11:00 AM', '11:30 AM',
                  '1:00 PM', '1:30 PM', '2:00 PM',
                  '2:30 PM', '3:00 PM',
                ].map((time) => (
                  <div
                    key={time}
                    className={`time-slot ${selectedTime === time ? 'selected' : ''}`}
                    onClick={() => setSelectedTime(time)}
                  >
                    {time}
                  </div>
                ))}
              </div>
            </div>

            <button className="primary-btn book-btn">
              Book Appointment
            </button>

            <button className="back-btn" onClick={() => setActivePage('dashboard')}>
              ⬅ Back
            </button>
          </section>
        );


      case 'about':
        return (
          <section className="about-section">
            <h3>About HealthCare Plus</h3>
            <p>
              HealthCare Plus is a modern platform designed to make managing your health simple and convenient.
              We connect patients with top doctors, simplify appointment scheduling, and help you stay informed about your wellbeing.
            </p>
            <h3>Our Mission</h3>
            <p>
              To provide accessible, efficient, and personalized healthcare for everyone.
            </p>
            <button className="back-btn" onClick={() => setActivePage('dashboard')}>
              ⬅ Back
            </button>
          </section>
        );

      default:
        return null;
    }
  };

  return (
    <div className="homepage-container">
      {/* Header */}
      <header className="homepage-header">
        <div className="header-inner">
          <div className="header-logo">
            <div className="medical-icon">⚕</div>
            <h1>HealthCare Plus</h1>
          </div>
          <nav className="header-nav">
            <button
              className={`nav-link ${activePage === 'dashboard' ? 'active' : ''}`}
              onClick={() => setActivePage('dashboard')}
            >
              Dashboard
            </button>
            <button
              className={`nav-link ${activePage === 'doctors' ? 'active' : ''}`}
              onClick={() => setActivePage('doctors')}
            >
              Doctors
            </button>
            <button
              className={`nav-link ${activePage === 'appointments' ? 'active' : ''}`}
              onClick={() => setActivePage('appointments')}
            >
              Appointments
            </button>
            <button
              className={`nav-link ${activePage === 'about' ? 'active' : ''}`}
              onClick={() => setActivePage('about')}
            >
              About
            </button>
          </nav>
          <div className="header-user">
            <span>Welcome, {user?.firstName || 'Patient'}</span>
            <button onClick={onSignOut} className="logout-btn">
              Sign Out
            </button>
          </div>
        </div>
      </header>

      {/* Main Section */}
      <main className="homepage-main">{renderContent()}</main>
    </div>
  );
}

export default HomePage;

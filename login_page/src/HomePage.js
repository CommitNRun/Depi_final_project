import React, { useState, useEffect } from 'react';
import './HomePage.css';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import axios from 'axios';

function HomePage({ user, onSignOut }) {
  const [activePage, setActivePage] = useState('dashboard');
  const [selectedType, setSelectedType] = useState(null);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState(null);
  const [message, setMessage] = useState('');
  const [appointments, setAppointments] = useState([]);

  // ✅ Fetch appointments for current user
  useEffect(() => {
    if (activePage === 'dashboard') {
      fetchAppointments();
    }
  }, [activePage]);

  const fetchAppointments = async () => {
    try {
      const response = await axios.get(
        `/appointments${user?._id || 'guest'}`
      );
      if (response.data.success) {
        setAppointments(response.data.appointments);
      } else {
        setAppointments([]);
      }
    } catch (error) {
      console.error('Error fetching appointments:', error);
    }
  };

  // ✅ Function to save appointment to backend
  const handleBookAppointment = async () => {
    if (!selectedType || !selectedTime) {
      setMessage('⚠️ Please select appointment type and time.');
      return;
    }

    const appointmentData = {
      userId: user?._id || 'guest',
      type: selectedType,
      date: selectedDate.toISOString().split('T')[0],
      time: selectedTime,
    };

    try {
      const response = await axios.post('/appointments', appointmentData);
      if (response.data.success) {
        setMessage('✅ Appointment booked successfully!');
        fetchAppointments();
      } else {
        setMessage('⚠️ Failed to book appointment.');
      }
    } catch (error) {
      console.error('Error booking appointment:', error);
      setMessage('⚠️ Something went wrong, please try again.');
    }
  };

  // ✅ Delete appointment function
  const handleDeleteAppointment = async (id) => {
    try {
      await axios.delete(`/appointments${id}`);
      fetchAppointments();
    } catch (error) {
      console.error('Error deleting appointment:', error);
    }
  };

  const renderContent = () => {
    switch (activePage) {
      case 'dashboard':
        return (
          <>
            <section className="welcome-section">
              <h2>Your Health Dashboard</h2>
              <p>Manage your healthcare journey in one place</p>
            </section>

            <section className="stats-section">
              <div className="stat-card">
                <div className="stat-icon">👨‍⚕️</div>
                <div>
                  <h3>Your Doctors</h3>
                  <p className="stat-value">3</p>
                  <span>Active physicians</span>
                </div>
              </div>

              {/* ✅ Next Appointments */}
              <div className="stat-card next-appointments">
                <div className="stat-icon">📅</div>
                <div>
                  <h3>Next Appointments</h3>
                  {appointments.length > 0 ? (
                    <ul className="appointment-list">
                      {appointments.map((appt) => {
                        const typeNames = {
                          1: 'General Consultation',
                          2: 'Follow-up Check',
                          3: 'Specialist Visit',
                          4: 'Medical Test',
                        };
                        const typeName = typeNames[appt.type] || 'Unknown Type';

                        return (
                          <li key={appt._id} className="appointment-item">
                            <div className="appointment-info">
                              <strong>{typeName}</strong>
                              <p>{appt.date} — {appt.time}</p>
                            </div>
                            <button
                              className="delete-btn"
                              onClick={() => handleDeleteAppointment(appt._id)}
                            >
                              ❌
                            </button>
                          </li>
                        );
                      })}
                    </ul>
                  ) : (
                    <p>No upcoming appointments</p>
                  )}
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
                <img src="/image1.png" alt="Dr. Ahmed Ibrahim Shanab" className="doctor-avatar" />
                <h4>Dr. Ahmed Ibrahim Shanab</h4>
                <p>Cardiologist</p>
                <button className="secondary-btn">View Profile</button>
              </div>

              <div className="doctor-card">
                <img src="/image2.png" alt="Dr. Moaz Mohamed" className="doctor-avatar" />
                <h4>Dr. Moaz Mohamed</h4>
                <p>Neurologist</p>
                <button className="secondary-btn">View Profile</button>
              </div>

              <div className="doctor-card">
                <img src="/image3.png" alt="Dr. Ahmed Makram" className="doctor-avatar" />
                <h4>Dr. Ahmed Makram</h4>
                <p>Dermatologist</p>
                <button className="secondary-btn">View Profile</button>
              </div>

              <div className="doctor-card">
                <img src="/image4.png" alt="Dr. Ahmed ElKady" className="doctor-avatar" />
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
                    className={`appointment-type ${selectedType === type.id ? 'selected' : ''}`}
                    onClick={() => setSelectedType(type.id)}
                  >
                    <h4>{type.name}</h4>
                    <p>{type.duration}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="calendar-container">
              <h3>Select date</h3>
              <Calendar onChange={setSelectedDate} value={selectedDate} minDate={new Date()} />
            </div>

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

            <button className="primary-btn book-btn" onClick={handleBookAppointment}>
              Book Appointment
            </button>

            {message && <p className="booking-message">{message}</p>}

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
              HealthCare Plus is a modern platform designed to make managing your health simple and
              convenient. We connect patients with top doctors, simplify appointment scheduling, and
              help you stay informed about your wellbeing.
            </p>
            <h3>Our Mission</h3>
            <p>To provide accessible, efficient, and personalized healthcare for everyone.</p>
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

      <main className="homepage-main">{renderContent()}</main>
    </div>
  );
}

export default HomePage;

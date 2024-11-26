import React, { useState, useEffect } from 'react';

// Types
interface Ride {
  id: string;
  driverName: string;
  carType: string;
  price: number;
  estimatedTime: number;
  rating: number;
}

const styles = {
  app: {
    maxWidth: '500px',
    margin: '0 auto',
    minHeight: '100vh',
    backgroundColor: '#FFFFFF',
    boxShadow: '0 0 20px rgba(0, 0, 0, 0.1)',
    fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Open Sans, Helvetica Neue, sans-serif',
  },
  container: {
    padding: '20px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    minHeight: '100vh',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '20px 0',
    borderBottom: '1px solid #E0E0E0',
  },
  logo: {
    fontSize: '24px',
    fontWeight: '800',
    color: '#2196F3',
  },
  button: {
    padding: '10px 15px',
    border: 'none',
    borderRadius: '12px',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    margin: '0 5px',
    fontWeight: '600',
  },
  primaryButton: {
    backgroundColor: '#2196F3',
    color: '#FFFFFF',
  },
  largeButton: {
    padding: '15px 25px',
    fontSize: '18px',
  },
  wideButton: {
    width: '100%',
    marginTop: '15px',
  },
  smallButton: {
    padding: '8px 12px',
    fontSize: '14px',
  },
  disabledButton: {
    backgroundColor: '#BDBDBD',
    cursor: 'not-allowed',
  },
  landingMain: {
    textAlign: 'center',
    padding: '50px 20px',
  },
  landingTitle: {
    fontSize: '36px',
    marginBottom: '15px',
    color: '#333',
  },
  landingSubtitle: {
    color: '#757575',
    marginBottom: '30px',
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: '12px',
    padding: '30px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    width: '100%',
  },
  cardTitle: {
    textAlign: 'center',
    marginBottom: '15px',
    color: '#333',
  },
  cardSubtitle: {
    textAlign: 'center',
    color: '#757575',
    marginBottom: '20px',
  },
  input: {
    width: '100%',
    padding: '12px 15px',
    marginBottom: '15px',
    border: '1px solid #E0E0E0',
    borderRadius: '12px',
    fontSize: '16px',
  },
  link: {
    color: '#2196F3',
    cursor: 'pointer',
    fontWeight: '600',
  },
  centerText: {
    textAlign: 'center',
    marginTop: '15px',
  },
  rides: {
    marginTop: '20px',
  },
  rideCard: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#F9F9F9',
    borderRadius: '12px',
    padding: '15px',
    marginBottom: '15px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.05)',
  },
  rideCardTitle: {
    fontSize: '18px',
    marginBottom: '5px',
  },
  rideCardText: {
    color: '#757575',
    textAlign: 'left',
  }
};

// App Component
const TaxiApp = () => {
  const [currentPage, setCurrentPage] = useState<'landing' | 'login' | 'signup' | 'booking' | 'confirmation'>('landing');
  const [bookedRide, setBookedRide] = useState<Ride | null>(null);

  useEffect(() => {
    const savedPage = localStorage.getItem('currentPage');
    if (savedPage) setCurrentPage(savedPage as any);
  }, []);

  useEffect(() => {
    localStorage.setItem('currentPage', currentPage);
  }, [currentPage]);

  const renderPage = () => {
    switch (currentPage) {
      case 'landing':
        return <LandingPage onNavigate={setCurrentPage} />;
      case 'login':
        return <LoginPage onNavigate={setCurrentPage} />;
      case 'signup':
        return <SignupPage onNavigate={setCurrentPage} />;
      case 'booking':
        return (
          <BookingPage
            onNavigate={setCurrentPage}
            onBookRide={(ride) => {
              setBookedRide(ride);
              setCurrentPage('confirmation');
            }}
          />
        );
      case 'confirmation':
        return <ConfirmationPage ride={bookedRide} onNavigate={setCurrentPage} />;
    }
  };

  return <div style={styles.app}>{renderPage()}</div>;
};

// Landing Page
const LandingPage = ({ onNavigate }: { onNavigate: (page: any) => void }) => (
  <div style={styles.container}>
    <header style={styles.header}>
      <div style={styles.logo}>QuickRide</div>
      <div>
        <button 
          style={{...styles.button, ...styles.primaryButton}} 
          onClick={() => onNavigate('login')}
        >
          Login
        </button>
        <button 
          style={{...styles.button, ...styles.primaryButton}} 
          onClick={() => onNavigate('signup')}
        >
          Sign Up
        </button>
      </div>
    </header>
    <main style={styles.landingMain}>
      <h1 style={styles.landingTitle}>Get There Fast</h1>
      <p style={styles.landingSubtitle}>Book a ride in seconds, travel in minutes</p>
      <button 
        style={{...styles.button, ...styles.primaryButton, ...styles.largeButton}} 
        onClick={() => onNavigate('booking')}
      >
        Book Now
      </button>
    </main>
  </div>
);

// Login Page
const LoginPage = ({ onNavigate }: { onNavigate: (page: any) => void }) => (
  <div style={styles.container}>
    <div style={styles.card}>
      <h2 style={styles.cardTitle}>Welcome Back</h2>
      <p style={styles.cardSubtitle}>Login to your account</p>
      <form>
        <input type="email" placeholder="Email" style={styles.input} />
        <input type="password" placeholder="Password" style={styles.input} />
        <button 
          style={{...styles.button, ...styles.primaryButton, ...styles.wideButton}} 
          onClick={(e) => {
            e.preventDefault();
            onNavigate('booking');
          }}
        >
          Login
        </button>
        <p style={styles.centerText}>
          Don't have an account?{' '}
          <span 
            style={styles.link} 
            onClick={() => onNavigate('signup')}
          >
            Sign up
          </span>
        </p>
      </form>
    </div>
  </div>
);

// Signup Page
const SignupPage = ({ onNavigate }: { onNavigate: (page: any) => void }) => (
  <div style={styles.container}>
    <div style={styles.card}>
      <h2 style={styles.cardTitle}>Create Account</h2>
      <p style={styles.cardSubtitle}>Sign up for a new account</p>
      <form>
        <input placeholder="Full Name" style={styles.input} />
        <input type="email" placeholder="Email" style={styles.input} />
        <input type="password" placeholder="Password" style={styles.input} />
        <input type="password" placeholder="Confirm Password" style={styles.input} />
        <button 
          style={{...styles.button, ...styles.primaryButton, ...styles.wideButton}} 
          onClick={(e) => {
            e.preventDefault();
            onNavigate('booking');
          }}
        >
          Sign Up
        </button>
        <p style={styles.centerText}>
          Already have an account?{' '}
          <span 
            style={styles.link} 
            onClick={() => onNavigate('login')}
          >
            Login
          </span>
        </p>
      </form>
    </div>
  </div>
);

// Booking Page
const BookingPage = ({
  onNavigate,
  onBookRide,
}: {
  onNavigate: (page: any) => void;
  onBookRide: (ride: Ride) => void;
}) => {
  const [pickup, setPickup] = useState('');
  const [dropoff, setDropoff] = useState('');
  const [showRides, setShowRides] = useState(false);

  const locations = ['City Center', 'Airport', 'Train Station', 'Hotel Plaza', 'University'];

  const availableRides: Ride[] = [
    { id: '1', driverName: 'John Smith', carType: 'Economy', price: 15, estimatedTime: 10, rating: 4.8 },
    { id: '2', driverName: 'Sarah Johnson', carType: 'Comfort', price: 22, estimatedTime: 12, rating: 4.9 },
    { id: '3', driverName: 'Mike Wilson', carType: 'Premium', price: 30, estimatedTime: 8, rating: 4.7 },
  ];

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.cardTitle}>Book a Ride</h2>
        <p style={styles.cardSubtitle}>Enter your pickup and dropoff locations</p>
        <select 
          style={styles.input} 
          value={pickup} 
          onChange={(e) => setPickup(e.target.value)}
        >
          <option value="">Pickup Location</option>
          {locations.map((loc) => (
            <option key={loc} value={loc}>
              {loc}
            </option>
          ))}
        </select>
        <select 
          style={styles.input} 
          value={dropoff} 
          onChange={(e) => setDropoff(e.target.value)}
        >
          <option value="">Dropoff Location</option>
          {locations.map((loc) => (
            <option key={loc} value={loc}>
              {loc}
            </option>
          ))}
        </select>
        <button
          style={{
            ...styles.button, 
            ...styles.primaryButton, 
            ...styles.wideButton,
            ...((!pickup || !dropoff) ? styles.disabledButton : {})
          }}
          onClick={() => setShowRides(true)}
          disabled={!pickup || !dropoff}
        >
          Find Rides
        </button>
        {showRides && (
          <div style={styles.rides}>
            {availableRides.map((ride) => (
              <div key={ride.id} style={styles.rideCard}>
                <div>
                  <h4 style={styles.rideCardTitle}>{ride.carType}</h4>
                  <p style={styles.rideCardText}>Driver: {ride.driverName}</p>
                  <p style={styles.rideCardText}>Rating: {ride.rating}⭐</p>
                </div>
                <div style={{textAlign: 'right'}}>
                  <p style={styles.rideCardText}>${ride.price}</p>
                  <p style={styles.rideCardText}>{ride.estimatedTime} mins</p>
                  <button 
                    style={{
                      ...styles.button, 
                      ...styles.primaryButton, 
                      ...styles.smallButton
                    }} 
                    onClick={() => onBookRide(ride)}
                  >
                    Book
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

// Confirmation Page
const ConfirmationPage = ({ ride, onNavigate }: { ride: Ride | null; onNavigate: (page: any) => void }) => {
  if (!ride) return null;

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.cardTitle}>Ride Booked!</h2>
        <p style={styles.cardSubtitle}>Driver: {ride.driverName} ({ride.carType})</p>
        <div style={{textAlign: 'center', marginBottom: '20px'}}>
          <p style={styles.rideCardText}>Price: ${ride.price}</p>
          <p style={styles.rideCardText}>Estimated Time: {ride.estimatedTime} mins</p>
        </div>
        <button 
          style={{
            ...styles.button, 
            ...styles.primaryButton, 
            ...styles.wideButton
          }} 
          onClick={() => onNavigate('booking')}
        >
          Book Another Ride
        </button>
      </div>
    </div>
  );
};

export default TaxiApp;
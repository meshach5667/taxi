 import React, { useState, useEffect } from 'react';
import { Car, MapPin, User, Lock, Mail, ArrowRight } from 'lucide-react';

// Types
interface Ride {
  id: string;
  driverName: string;
  carType: string;
  price: number;
  estimatedTime: number;
  rating: number;
}

// Styles
const styles = {
  app: {
    minHeight: '100vh’,
    backgroundColor: '#f5f5f5',
    display: 'flex',
    flexDirection: 'column',
    fontFamily: 'Arial, sans-serif'
  },
  container: {
    maxWidth: '500px',
    margin: '0 auto',
    padding: '20px'
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '30px'
  },
  logo: {
    fontSize: '24px',
    fontWeight: 'bold'
  },
  button: {
    padding: '10px 15px',
    margin: '0 5px',
    border: '1px solid #ccc',
    borderRadius: '5px',
    cursor: 'pointer',
    backgroundColor: 'white'
  },
  primaryButton: {
    backgroundColor: '#007bff',
    color: 'white',
    border: 'none'
  },
  card: {
    backgroundColor: 'white',
    borderRadius: '8px',
    boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
    padding: '20px',
    marginBottom: '20px'
  },
  input: {
    width: '100%',
    padding: '10px',
    margin: '10px 0',
    border: '1px solid #ccc',
    borderRadius: '5px'
  }
};

// App Component with persistent state
const TaxiApp = () => {
  const [currentPage, setCurrentPage] = useState<'landing' | 'login' | 'signup' | 'booking' | 'confirmation'>('landing');
  const [bookedRide, setBookedRide] = useState<Ride | null>(null);

  // Load page state from localStorage on initial render
  useEffect(() => {
    const savedPage = localStorage.getItem('currentPage');
    if (savedPage) {
      setCurrentPage(savedPage as any);
    }
  }, []);

  // Save page state to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('currentPage', currentPage);
  }, [currentPage]);

  const renderPage = () => {
    switch(currentPage) {
      case 'landing':
        return <LandingPage onNavigate={setCurrentPage} />;
      case 'login':
        return <LoginPage onNavigate={setCurrentPage} />;
      case 'signup':
        return <SignupPage onNavigate={setCurrentPage} />;
      case 'booking':
        return <BookingPage 
          onNavigate={setCurrentPage} 
          onBookRide={(ride) => {
            setBookedRide(ride);
            setCurrentPage('confirmation');
          }} 
        />;
      case 'confirmation':
        return <ConfirmationPage 
          ride={bookedRide} 
          onNavigate={setCurrentPage} 
        />;
    }
  };

  return (
    <div style={styles.app}>
      {renderPage()}
    </div>
  );
};

// Landing Page
const LandingPage = ({ onNavigate }: { onNavigate: (page: any) => void }) => {
  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <div style={styles.logo}>QuickRide</div>
        <div>
          <button 
            style={{...styles.button, marginRight: '10px'}} 
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
      </div>
      
      <div style={{textAlign: 'center', marginTop: '100px'}}>
        <h2 style={{fontSize: '36px', marginBottom: '20px'}}>Get There Fast</h2>
        <p style={{color: '#666', marginBottom: '30px'}}>Book a ride in seconds, travel in minutes</p>
        <button 
          style={{...styles.button, ...styles.primaryButton, padding: '15px 30px'}} 
          onClick={() => onNavigate('booking')}
        >
          Book Now
        </button>
      </div>
    </div>
  );
};

// Login Page
const LoginPage = ({ onNavigate }: { onNavigate: (page: any) => void }) => {
  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={{marginBottom: '10px'}}>Welcome Back</h2>
        <p style={{color: '#666', marginBottom: '20px'}}>Login to your account</p>
        <form>
          <input 
            type="email" 
            placeholder="Email" 
            style={styles.input} 
          />
          <input 
            type="password" 
            placeholder="Password" 
            style={styles.input} 
          />
          <button 
            style={{...styles.button, ...styles.primaryButton, width: '100%', marginTop: '20px'}} 
            onClick={(e) => {
              e.preventDefault();
              onNavigate('booking');
            }}
          >
            Login
          </button>
          <p style={{textAlign: 'center', marginTop: '15px'}}>
            Don't have an account?{' '}
            <span 
              style={{color: '#007bff', cursor: 'pointer'}} 
              onClick={() => onNavigate('signup')}
            >
              Sign up
            </span>
          </p>
        </form>
      </div>
    </div>
  );
};

// Signup Page
const SignupPage = ({ onNavigate }: { onNavigate: (page: any) => void }) => {
  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={{marginBottom: '10px'}}>Create Account</h2>
        <p style={{color: '#666', marginBottom: '20px'}}>Sign up for a new account</p>
        <form>
          <input 
            placeholder="Full Name" 
            style={styles.input} 
          />
          <input 
            type="email" 
            placeholder="Email" 
            style={styles.input} 
          />
          <input 
            type="password" 
            placeholder="Password" 
            style={styles.input} 
          />
          <input 
            type="password" 
            placeholder="Confirm Password" 
            style={styles.input} 
          />
          <button 
            style={{...styles.button, ...styles.primaryButton, width: '100%', marginTop: '20px'}} 
            onClick={(e) => {
              e.preventDefault();
              onNavigate('booking');
            }}
          >
            Sign Up
          </button>
          <p style={{textAlign: 'center', marginTop: '15px'}}>
            Already have an account?{' '}
            <span 
              style={{color: '#007bff', cursor: 'pointer'}} 
              onClick={() => onNavigate('login')}
            >
              Login
            </span>
          </p>
        </form>
      </div>
    </div>
  );
};

// Booking Page
const BookingPage = ({ 
  onNavigate, 
  onBookRide 
}: { 
  onNavigate: (page: any) => void, 
  onBookRide: (ride: Ride) => void 
}) => {
  const [pickup, setPickup] = useState('');
  const [dropoff, setDropoff] = useState('');
  const [showRides, setShowRides] = useState(false);

  // Dummy rides data
  const availableRides: Ride[] = [
    {
      id: '1',
      driverName: 'John Smith',
      carType: 'Economy',
      price: 15,
      estimatedTime: 10,
      rating: 4.8
    },
    {
      id: '2',
      driverName: 'Sarah Johnson',
      carType: 'Comfort',
      price: 22,
      estimatedTime: 12,
      rating: 4.9
    },
    {
      id: '3',
      driverName: 'Mike Wilson',
      carType: 'Premium',
      price: 30,
      estimatedTime: 8,
      rating: 4.7
    }
  ];

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={{marginBottom: '10px'}}>Book a Ride</h2>
        <p style={{color: '#666', marginBottom: '20px'}}>Enter your pickup and dropoff locations</p>
        <div>
          <input
            placeholder="Pickup Location"
            style={styles.input}
            value={pickup}
            onChange={(e) => setPickup(e.target.value)}
          />
          <input
            placeholder="Dropoff Location"
            style={styles.input}
            value={dropoff}
            onChange={(e) => setDropoff(e.target.value)}
          />
          <button 
            style={{
              ...styles.button, 
              ...styles.primaryButton, 
              width: '100%', 
              marginTop: '20px',
              opacity: (!pickup || !dropoff) ? 0.5 : 1,
              cursor: (!pickup || !dropoff) ? 'not-allowed' : 'pointer'
            }}
            onClick={() => setShowRides(true)}
            disabled={!pickup || !dropoff}
          >
            Find Rides
          </button>

          {showRides && (
            <div style={{marginTop: '30px'}}>
              <h3 style={{marginBottom: '15px'}}>Available Rides:</h3>
              {availableRides.map((ride) => (
                <div key={ride.id} style={{...styles.card, marginBottom: '15px'}}>
                  <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                    <div>
                      <div style={{display: 'flex', alignItems: 'center', marginBottom: '10px'}}>
                        <span style={{marginRight: '10px'}}>{ride.carType}</span>
                      </div>
                      <p style={{color: '#666', marginBottom: '5px'}}>Driver: {ride.driverName}</p>
                      <p style={{color: '#666'}}>Rating: {ride.rating}⭐</p>
                    </div>
                    <div style={{textAlign: 'right'}}>
                      <p style={{fontWeight: 'bold'}}>${ride.price}</p>
                      <p style={{color: '#666', marginBottom: '10px'}}>{ride.estimatedTime} mins</p>
                      <button 
                        style={{...styles.button, ...styles.primaryButton, padding: '8px 15px'}}
                        onClick={() => onBookRide(ride)}
                      >
                        Book
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// Confirmation Page
const ConfirmationPage = ({ 
  ride, 
  onNavigate 
}: { 
  ride: Ride | null, 
  onNavigate: (page: any) => void 
}) => {
  if (!ride) return null;

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={{marginBottom: '20px', textAlign: 'center'}}>Ride Booked!</h2>
        <div style={{textAlign: 'center', marginBottom: '30px'}}>
          <p style={{fontSize: '18px', marginBottom: '10px'}}>Your ride is confirmed</p>
          <p style={{color: '#666', marginBottom: '20px'}}>
            Driver: {ride.driverName} ({ride.carType})
          </p>
          <p style={{fontSize: '24px', fontWeight: 'bold', color: '#007bff'}}>
            ${ride.price}
          </p>
          <p style={{color: '#666', marginTop: '10px'}}>
            Estimated Time: {ride.estimatedTime} mins
          </p>
        </div>
        <button 
          style={{...styles.button, ...styles.primaryButton, width: '100%'}}
          onClick={() => onNavigate('booking')}
        >
          Book Another Ride
        </button>
      </div>
    </div>
  );
};

export default TaxiApp;

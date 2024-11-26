import React, { useState } from 'react';
import { Car, MapPin, User, Lock, Mail, ArrowRight } from 'lucide-react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

// Types
interface Ride {
  id: string;
  driverName: string;
  carType: string;
  price: number;
  estimatedTime: number;
  rating: number;
}

// App Component with basic routing
const TaxiApp = () => {
  const [currentPage, setCurrentPage] = useState<'landing' | 'login' | 'signup' | 'booking'>('landing');
  
  const renderPage = () => {
    switch(currentPage) {
      case 'landing':
        return <LandingPage onNavigate={setCurrentPage} />;
      case 'login':
        return <LoginPage onNavigate={setCurrentPage} />;
      case 'signup':
        return <SignupPage onNavigate={setCurrentPage} />;
      case 'booking':
        return <BookingPage onNavigate={setCurrentPage} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {renderPage()}
    </div>
  );
};

// Landing Page
const LandingPage = ({ onNavigate }: { onNavigate: (page: 'landing' | 'login' | 'signup' | 'booking') => void }) => {
  return (
    <div className="max-w-4xl mx-auto p-8">
      <div className="flex justify-between items-center mb-12">
        <h1 className="text-2xl font-bold">QuickRide</h1>
        <div className="space-x-4">
          <Button variant="outline" onClick={() => onNavigate('login')}>Login</Button>
          <Button onClick={() => onNavigate('signup')}>Sign Up</Button>
        </div>
      </div>
      
      <div className="text-center space-y-6 mt-20">
        <h2 className="text-4xl font-bold">Get There Fast</h2>
        <p className="text-xl text-gray-600">Book a ride in seconds, travel in minutes</p>
        <Button size="lg" onClick={() => onNavigate('booking')}>
          Book Now <ArrowRight className="ml-2" size={20} />
        </Button>
      </div>

      <div className="grid grid-cols-3 gap-8 mt-20">
        <Card>
          <CardContent className="pt-6">
            <h3 className="text-lg font-semibold mb-2">Quick Booking</h3>
            <p className="text-gray-600">Book your ride in just a few clicks</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <h3 className="text-lg font-semibold mb-2">Safe Rides</h3>
            <p className="text-gray-600">All drivers are verified and trained</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <h3 className="text-lg font-semibold mb-2">24/7 Support</h3>
            <p className="text-gray-600">We're here to help anytime</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

// Login Page
const LoginPage = ({ onNavigate }: { onNavigate: (page: 'landing' | 'login' | 'signup' | 'booking') => void }) => {
  return (
    <div className="max-w-md mx-auto p-8">
      <Card>
        <CardHeader>
          <CardTitle>Welcome Back</CardTitle>
          <CardDescription>Login to your account</CardDescription>
        </CardHeader>
        <CardContent>
          <form className="space-y-4">
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Mail className="text-gray-500" size={20} />
                <Input type="email" placeholder="Email" />
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Lock className="text-gray-500" size={20} />
                <Input type="password" placeholder="Password" />
              </div>
            </div>
            <Button 
              className="w-full" 
              onClick={(e) => {
                e.preventDefault();
                onNavigate('booking');
              }}
            >
              Login
            </Button>
            <p className="text-center text-sm">
              Don't have an account?{' '}
              <button 
                className="text-blue-500 hover:underline"
                onClick={() => onNavigate('signup')}
              >
                Sign up
              </button>
            </p>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

// Signup Page
const SignupPage = ({ onNavigate }: { onNavigate: (page: 'landing' | 'login' | 'signup' | 'booking') => void }) => {
  return (
    <div className="max-w-md mx-auto p-8">
      <Card>
        <CardHeader>
          <CardTitle>Create Account</CardTitle>
          <CardDescription>Sign up for a new account</CardDescription>
        </CardHeader>
        <CardContent>
          <form className="space-y-4">
            <div className="flex items-center space-x-2">
              <User className="text-gray-500" size={20} />
              <Input placeholder="Full Name" />
            </div>
            <div className="flex items-center space-x-2">
              <Mail className="text-gray-500" size={20} />
              <Input type="email" placeholder="Email" />
            </div>
            <div className="flex items-center space-x-2">
              <Lock className="text-gray-500" size={20} />
              <Input type="password" placeholder="Password" />
            </div>
            <div className="flex items-center space-x-2">
              <Lock className="text-gray-500" size={20} />
              <Input type="password" placeholder="Confirm Password" />
            </div>
            <Button 
              className="w-full"
              onClick={(e) => {
                e.preventDefault();
                onNavigate('booking');
              }}
            >
              Sign Up
            </Button>
            <p className="text-center text-sm">
              Already have an account?{' '}
              <button 
                className="text-blue-500 hover:underline"
                onClick={() => onNavigate('login')}
              >
                Login
              </button>
            </p>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

// Booking Page
const BookingPage = ({ onNavigate }: { onNavigate: (page: 'landing' | 'login' | 'signup' | 'booking') => void }) => {
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
    <div className="max-w-md mx-auto p-8">
      <Card>
        <CardHeader>
          <CardTitle>Book a Ride</CardTitle>
          <CardDescription>Enter your pickup and dropoff locations</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <MapPin className="text-gray-500" size={20} />
              <Input
                placeholder="Pickup Location"
                value={pickup}
                onChange={(e) => setPickup(e.target.value)}
              />
            </div>
            <div className="flex items-center space-x-2">
              <MapPin className="text-gray-500" size={20} />
              <Input
                placeholder="Dropoff Location"
                value={dropoff}
                onChange={(e) => setDropoff(e.target.value)}
              />
            </div>
            <Button 
              className="w-full"
              onClick={() => setShowRides(true)}
              disabled={!pickup || !dropoff}
            >
              Find Rides
            </Button>

            {showRides && (
              <div className="space-y-4 mt-6">
                <h3 className="font-semibold">Available Rides:</h3>
                {availableRides.map((ride) => (
                  <Card key={ride.id}>
                    <CardContent className="p-4">
                      <div className="flex justify-between items-center">
                        <div>
                          <div className="flex items-center space-x-2">
                            <Car size={20} />
                            <span className="font-semibold">{ride.carType}</span>
                          </div>
                          <p className="text-sm text-gray-500">Driver: {ride.driverName}</p>
                          <p className="text-sm text-gray-500">Rating: {ride.rating}⭐</p>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold">${ride.price}</p>
                          <p className="text-sm text-gray-500">{ride.estimatedTime} mins</p>
                          <Button 
                            size="sm" 
                            className="mt-2"
                            onClick={() => alert(`Booking confirmed with ${ride.driverName}!`)}
                          >
                            Book
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TaxiApp;
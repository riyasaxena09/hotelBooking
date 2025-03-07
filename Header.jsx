import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="bg-blue-800 text-white">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <Link to="/" className="text-2xl font-bold">
            Booking.com
          </Link>
          
          <div className="flex items-center gap-4">
            <select className="bg-blue-800 text-white">
              <option>INR</option>
            </select>
            <button className="px-4 py-2 text-blue-800 bg-white rounded-md">
              Register
            </button>
            <button className="px-4 py-2 text-blue-800 bg-white rounded-md">
              Sign in
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
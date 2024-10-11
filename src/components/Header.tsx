import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, LogOut } from 'lucide-react';

interface HeaderProps {
  isLoggedIn: boolean;
  setIsLoggedIn: (value: boolean) => void;
}

const Header: React.FC<HeaderProps> = ({ isLoggedIn, setIsLoggedIn }) => {
  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  return (
    <header className="bg-green-600 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold">VeggieMarket</Link>
        <nav>
          {isLoggedIn ? (
            <div className="flex items-center space-x-4">
              <Link to="/checkout" className="hover:text-green-200">
                <ShoppingCart size={24} />
              </Link>
              <button onClick={handleLogout} className="hover:text-green-200">
                <LogOut size={24} />
              </button>
            </div>
          ) : (
            <Link to="/login" className="hover:text-green-200">Login</Link>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
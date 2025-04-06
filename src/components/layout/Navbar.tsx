
import React from 'react';
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import {
  BookOpen,
  Users,
  Calendar,
  Menu,
  X,
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const Navbar = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <span className="text-primary-900 font-bold text-xl">The Accountancy Circle</span>
            </Link>
          </div>
          
          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center space-x-4">
            <Link to="/resources" className="flex items-center px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:bg-primary-50">
              <BookOpen className="w-4 h-4 mr-1" />
              Resources
            </Link>
            <Link to="/community" className="flex items-center px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:bg-primary-50">
              <Users className="w-4 h-4 mr-1" />
              Community
            </Link>
            <Link to="/events" className="flex items-center px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:bg-primary-50">
              <Calendar className="w-4 h-4 mr-1" />
              Events
            </Link>
            
            {isAuthenticated ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={user?.avatar} alt={user?.name} />
                      <AvatarFallback>{user?.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">{user?.name}</p>
                      <p className="text-xs leading-none text-muted-foreground">
                        {user?.email}
                      </p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => navigate('/dashboard')}>
                    Dashboard
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => navigate('/profile')}>
                    Profile
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout}>
                    Log out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <div className="flex space-x-2">
                <Button variant="outline" onClick={() => navigate('/login')}>
                  Log In
                </Button>
                <Button onClick={() => navigate('/register')}>
                  Sign Up
                </Button>
              </div>
            )}
          </div>
          
          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-500"
              onClick={toggleMenu}
            >
              <span className="sr-only">Open main menu</span>
              {isMenuOpen ? (
                <X className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile menu, show/hide based on menu state */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-b border-gray-200">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <Link 
              to="/resources" 
              className="flex items-center px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-primary-50"
              onClick={() => setIsMenuOpen(false)}
            >
              <BookOpen className="w-4 h-4 mr-2" />
              Resources
            </Link>
            <Link 
              to="/community" 
              className="flex items-center px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-primary-50"
              onClick={() => setIsMenuOpen(false)}
            >
              <Users className="w-4 h-4 mr-2" />
              Community
            </Link>
            <Link 
              to="/events" 
              className="flex items-center px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-primary-50"
              onClick={() => setIsMenuOpen(false)}
            >
              <Calendar className="w-4 h-4 mr-2" />
              Events
            </Link>
            
            {isAuthenticated ? (
              <>
                <Link 
                  to="/dashboard" 
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-primary-50"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Dashboard
                </Link>
                <Link 
                  to="/profile" 
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-primary-50"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Profile
                </Link>
                <Button 
                  variant="ghost" 
                  className="w-full justify-start px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-primary-50"
                  onClick={() => {
                    handleLogout();
                    setIsMenuOpen(false);
                  }}
                >
                  Log out
                </Button>
              </>
            ) : (
              <div className="flex flex-col space-y-2 px-3 py-2">
                <Button variant="outline" onClick={() => {
                  navigate('/login');
                  setIsMenuOpen(false);
                }}>
                  Log In
                </Button>
                <Button onClick={() => {
                  navigate('/register');
                  setIsMenuOpen(false);
                }}>
                  Sign Up
                </Button>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;

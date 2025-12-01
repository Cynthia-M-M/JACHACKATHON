import { Link, NavLink, useNavigate } from 'react-router-dom';
import { Compass, User, Briefcase, BookOpen, LogOut } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { Button } from './ui/button';

export default function Header() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/');
    window.location.reload();
  };

  const navLinkClasses = ({ isActive }: { isActive: boolean }) =>
    `flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors ${
      isActive
        ? 'bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white'
        : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
    }`;

  return (
    <header className="bg-white dark:bg-gray-800 shadow-md sticky top-0 z-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <Compass className="h-8 w-8 text-indigo-600" />
              <span className="text-xl font-bold text-gray-900 dark:text-white">Akazi Path</span>
            </Link>
          </div>
          <nav className="hidden md:flex md:space-x-4 md:items-center">
            <NavLink to="/" className={navLinkClasses} end>
              <Compass className="mr-2 h-5 w-5" />
              Dashboard
            </NavLink>
            <NavLink to="/profile" className={navLinkClasses}>
              <User className="mr-2 h-5 w-5" />
              My Profile
            </NavLink>
            <NavLink to="/roles" className={navLinkClasses}>
              <Briefcase className="mr-2 h-5 w-5" />
              Explore Roles
            </NavLink>
            <NavLink to="/learning" className={navLinkClasses}>
              <BookOpen className="mr-2 h-5 w-5" />
              Courses
            </NavLink>
            <Button
              onClick={handleLogout}
              variant="ghost"
              size="sm"
              className="ml-4 text-gray-600 dark:text-gray-300 hover:text-red-600 dark:hover:text-red-400"
            >
              <LogOut className="h-5 w-5" />
            </Button>
          </nav>
        </div>
      </div>
    </header>
  );
}

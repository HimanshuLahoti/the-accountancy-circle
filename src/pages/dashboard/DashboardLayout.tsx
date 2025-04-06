
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import StudentDashboard from './StudentDashboard';
import FacultyDashboard from './FacultyDashboard';
import MainLayout from '@/components/layout/MainLayout';

const DashboardLayout: React.FC = () => {
  const { user, isAuthenticated } = useAuth();
  
  // Redirect to login if not authenticated
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return (
    <MainLayout>
      {user?.role === 'student' ? (
        <StudentDashboard />
      ) : user?.role === 'faculty' ? (
        <FacultyDashboard />
      ) : (
        // Fallback in case of unknown role
        <div className="p-4">
          <h1>Unknown role type</h1>
        </div>
      )}
    </MainLayout>
  );
};

export default DashboardLayout;

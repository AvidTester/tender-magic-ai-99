
import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { useRole } from '@/context/RoleContext';

interface RoleProtectedRouteProps {
  children: ReactNode;
  allowedRoles: Array<'procurement-officer' | 'evaluator' | 'vendor'>;
}

export const RoleProtectedRoute = ({ 
  children, 
  allowedRoles 
}: RoleProtectedRouteProps) => {
  const { role } = useRole();
  
  if (!role) {
    return <Navigate to="/select-role" replace />;
  }
  
  if (!allowedRoles.includes(role)) {
    return <Navigate to="/unauthorized" replace />;
  }
  
  return <>{children}</>;
};

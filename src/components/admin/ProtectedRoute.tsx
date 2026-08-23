import { Navigate } from 'react-router-dom';
import type { ReactNode } from 'react';
import { useAuth } from '@/lib/authContext';
import { PageLoader } from '@/components/ui';

interface ProtectedRouteProps {
  children: ReactNode;
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { session, loading } = useAuth();

  if (loading) return <PageLoader />;
  if (!session) return <Navigate to="/admin/login" replace />;

  return <>{children}</>;
}

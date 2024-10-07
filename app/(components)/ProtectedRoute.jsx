"use client"
import { useRouter } from 'next/navigation';
import { useAuthContext } from '../(hooks)/useAuthContext';
import { useEffect } from 'react';

const ProtectedRoute = ({ children, roles }) => {
  const { user } = useAuthContext();
  const router = useRouter();

  useEffect(() => {
    if (user) {
      if (!roles.includes(user.role)) {
        router.push('/not-authorized');
      }
    } else {
        alert("You are not logged in!")
        router.push('/login');
    }
  }, [user, roles, router]);

  if (!user || !roles.includes(user.role)) {
    return null; 
  }

  return children;
};

export default ProtectedRoute;

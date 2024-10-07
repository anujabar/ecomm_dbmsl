import { useRouter } from 'next/router';
import { useAuthContext } from '../(hooks)/useAuthContext';
import { useEffect } from 'react';

const ProtectedRoute = ({ children, roles }) => {
  const { user } = useAuthContext();
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push('/login');
    } else if (!roles.includes(user.role)) {
      router.push('/not-authorized');
    }
  }, [user, router, roles]);

  if (!user || !roles.includes(user.role)) {
    return null;
  }

  return children;
};

export default ProtectedRoute;

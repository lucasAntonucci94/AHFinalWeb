import { Navigate, Outlet } from 'react-router-dom';
import { UseAuth } from './UseAuth';

export function ProtectedRoute({ children, ...rest }) {
    const { hasAuthentication } = UseAuth();
    if (!hasAuthentication) {
        return <Navigate to="/login" replace />; 
    }
  return <Outlet {...rest} />;
}

export default ProtectedRoute;
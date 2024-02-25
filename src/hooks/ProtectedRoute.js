import { Navigate, Outlet } from 'react-router-dom';
import { UseAuth } from './UseAuth'; // Import your custom hook

export function ProtectedRoute({ children, ...rest }) {
    const { hasAuthentication } = UseAuth();
    if (!hasAuthentication) {
        return <Navigate to="/login" replace />; // Redirect to login if not authenticated
    }
  return <Outlet {...rest} />; // Render children if authenticated
}

export default ProtectedRoute;
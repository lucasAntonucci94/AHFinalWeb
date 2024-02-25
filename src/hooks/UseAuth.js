import { useState, useEffect } from 'react';

export function UseAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const isAuthed = !!token;
    setIsAuthenticated(isAuthed);
    setIsCheckingAuth(false);
  }, []);

  function hasAuthentication(){
    const token = localStorage.getItem('token');
    return !!token;
  }

  return {
    isAuthenticated,
    isCheckingAuth,
    setIsAuthenticated,
    hasAuthentication
  };
}

export default UseAuth;
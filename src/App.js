import './App.css';
import ProtectedRoute from './hooks/ProtectedRoute';
import { UseAuth } from './hooks/UseAuth';
import 'bootstrap/dist/css/bootstrap.min.css';
import AnimalsIndex from './pages/animals'
import MasterPage from './pages/layouts/masterPage'
import HomePage from './pages/home'
import LoginPage from './pages/login'
import RegisterPage from './pages/register'
import ProfilePage from './pages/profile'
import DashboardPage from './pages/admin/dashboard'
import AnimalsView from './pages/animals/view'
import ABMAnimals from './pages/admin/animals'
import ABMAnimalsView from './pages/admin/animals/view'
import ABMUsers from './pages/admin/users'
import ABMUsersView from './pages/admin/users/view'
import ABMRaces from './pages/admin/races'
import ABMRacesView from './pages/admin/races/view'
import ABMSpecies from './pages/admin/species'
import ABMSpeciesView from './pages/admin/species/view'
import PageNotFound from './pages/pageNotFound'
import ResetPassword from './pages/resetPassword'
import { Routes, Route, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';

function App() {
  const { isCheckingAuth, hasAuthentication } = UseAuth();
  const [isAuth, setisAuth] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    const isAuthed = hasAuthentication();
    setisAuth(isAuthed);
    if (!isAuthed && !(window.location.pathname.startsWith('/reset-password/'))) {
      navigate('/login')
    }
  }, []);

  function onLogin(user, token){
    debugger
    localStorage.setItem('user', JSON.stringify(user))
    localStorage.setItem('token', token)
    navigate('/', {replace:true})
  }

  function onLogout(){
    localStorage.removeItem('user')
    localStorage.removeItem('token')
    navigate('/login', {replace:true})
  }

  return (
    <>
      {isCheckingAuth ? (
        <div>Checking authentication...</div>
      ) : (
        <Routes>
          <Route
            path="/*"
            element={<MasterPage onLogout={onLogout}>
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/animals" element={<AnimalsIndex />} />
                <Route path="/animals/:id" element={<AnimalsView />} />
                <Route path="/profile" element={<ProfilePage />} />
                <Route path="/login" element={<LoginPage onLogin={onLogin} />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/reset-password/:email" element={<ResetPassword />} />
                <Route path="*" element={<PageNotFound />} />
              </Routes>
            </MasterPage>}
          />
          <Route
            path="/admin/*"
            element={
                <MasterPage onLogout={onLogout}>
                  <ProtectedRoute isAuthenticated={hasAuthentication()}>
                      <Outlet />
                  </ProtectedRoute>
                </MasterPage>
            }
          >
            <Route path="dashboard" element={<DashboardPage />} />
            <Route path="animals" element={<ABMAnimals />} />
            <Route path="animals/:id" element={<ABMAnimalsView />} />
            <Route path="users" element={<ABMUsers />} />
            <Route path="users/:id" element={<ABMUsersView />} />
            <Route path="races" element={<ABMRaces />} />
            <Route path="races/:id" element={<ABMRacesView />} />
            <Route path="species" element={<ABMSpecies />} />
            <Route path="species/:id" element={<ABMSpeciesView />} />
          </Route>
        </Routes>
      )}
    </>
  );
}

export default App;
